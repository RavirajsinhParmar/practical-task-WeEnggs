import React from "react";
import "./table.css";

const EstimateRow = ({ item, onChange, iIdx }) => {
  return (
    <tr
      className="table-row"
      style={{ backgroundColor: iIdx % 2 === 0 ? "white" : "#f2f2f2" }}
    >
      <td>{item?.item_type_display_name}</td>
      <td>{item?.subject}</td>
      <td>
        <input
          type="number"
          value={item?.quantity}
          onChange={(e) => onChange("quantity", Number(e.target.value))}
        />
      </td>
      <td>
        <input
          type="number"
          value={item?.unit_cost}
          step="0.01"
          onChange={(e) => onChange("unit_cost", Number(e.target.value))}
        />
      </td>
      <td>{item?.unit}</td>
      <td>${item?.total.toFixed(2)}</td>
      <td>{item?.tax}</td>
      <td>{item?.cost_code}</td>
    </tr>
  );
};

export default EstimateRow;
