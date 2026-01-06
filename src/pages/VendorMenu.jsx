import { useParams } from "react-router-dom";
import { beverages } from "../data/beverages";
import Menu from "./Menu";

export default function VendorMenu() {
  const { id } = useParams();

  const vendorItems = beverages.filter((b) => b.vendorId == id);

  return <Menu beveragesList={vendorItems} />;
}
