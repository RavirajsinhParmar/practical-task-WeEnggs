import React, { useEffect, useState } from "react";
import { fetchEstimateData } from "../../services/estimateService";
import EstimateTable from "../../components/EstimateTable";

const EstimationList = () => {
  const [sections, setSections] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    fetchEstimateData()?.then((data) => {
      const formatted = data.map((section) => ({
        ...section,
        items: section.items.map((item) => ({
          ...item,
          quantity: item.quantity || 0,
          unit_cost: item.unit_cost / 100,
          total: (item.quantity || 0) * (item.unit_cost / 100),
        })),
      }));

      // Open all sections by default
      const defaultOpen = {};
      formatted.forEach((sec) => {
        defaultOpen[sec.section_id] = true;
      });

      setSections(formatted);
      setOpenSections(defaultOpen);
      updateGrandTotal(formatted);
    });
  }, []);

  const handleChange = (sectionIndex, itemIndex, field, value) => {
    const updatedSections = [...sections];
    const item = updatedSections[sectionIndex]?.items[itemIndex];
    item[field] = value;
    item.total = item?.quantity * item?.unit_cost;
    updatedSections[sectionIndex].section_total = updatedSections[
      sectionIndex
    ]?.items.reduce((sum, it) => sum + it.total, 0);
    setSections(updatedSections);
    updateGrandTotal(updatedSections);
  };

  const updateGrandTotal = (data) => {
    const total = data.reduce(
      (sum, sec) => sum + sec.items.reduce((s, i) => s + i.total, 0),
      0
    );
    setGrandTotal(total);
  };

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <EstimateTable
      sections={sections}
      grandTotal={grandTotal}
      openSections={openSections}
      handleChange={handleChange}
      toggleSection={toggleSection}
    />
  );
};

export default EstimationList;
