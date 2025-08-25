import { BiExpandHorizontal } from "react-icons/bi";

function TablaBase({ columnas, datos }) {
  return (
    <table className="tabla-base">
      <thead className="th">
        <tr className="tr">
          {columnas.map((c, i) => <th key={i}>{c}</th>)}
        </tr>
      </thead>
      <tbody className="td">
        {datos.map((fila, i) => (
          <tr className="tr" key={i}>
            {fila.map((celda, j) => (
              <td key={j} data-label={columnas[j]}>
                {celda}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
} export default TablaBase;
