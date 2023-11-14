import { useParams } from "react-router-dom";

const Entry = () => {
  const { id } = useParams();

  return <div>space detail {id}</div>;
};

export default Entry;
