import EstimateRow from "./EstimateRow";
import "./table.css";

const EstimateTable = (props) => {
  const { sections, grandTotal, openSections, handleChange, toggleSection } =
    props;
  return (
    <div>
      <h2 className="grand-total">
        <strong>Grand Total:</strong> ${grandTotal?.toFixed(2)}
      </h2>

      {sections?.map(
        (section, sIdx) =>
          section?.items?.length > 0 && (
            <div key={section?.section_id} className="section">
              <div
                className="section-header"
                onClick={() => toggleSection(section?.section_id)}
              >
                <span>
                  {openSections[section?.section_id] ? "➖" : "➕"}{" "}
                  {section?.section_name}
                </span>
                <span>
                  $
                  {section?.items
                    ?.reduce((sum, item) => sum + item.total, 0)
                    .toFixed(2)}
                </span>
              </div>

              {openSections[section?.section_id] && (
                <div>
                  <table className="table" border={0.75}>
                    <thead className="head">
                      <tr>
                        <th>Type</th>
                        <th>Item Name</th>
                        <th>QTY</th>
                        <th>Unit Cost</th>
                        <th>Unit</th>
                        <th>Total</th>
                        <th>Tax</th>
                        <th>Cost Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section?.items?.map((item, iIdx) => (
                        <EstimateRow
                          key={item?.item_id}
                          item={item}
                          iIdx={iIdx}
                          onChange={(field, value) =>
                            handleChange(sIdx, iIdx, field, value)
                          }
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
};

export default EstimateTable;
