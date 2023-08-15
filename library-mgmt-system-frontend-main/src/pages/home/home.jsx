import React from "react";
import BasicCard from "../../components/cards/card";
import "./home.css";
import { axiosFetch } from "../../axios/axiosFetch";

export default function Home() {
  const [totalBooks, setTotalBooks] = React.useState({
    count: "...",
    heading: "Total Books",
    title: "Total number of unique books in the library.",
  });
  const [issuedBooks, setIssuedBooks] = React.useState({
    count: "...",
    heading: "Issued Books",
    title: "Total number books issued currently.",
  });
  const [membersCount, setMembersCount] = React.useState({
    count: "...",
    heading: "Total Members",
    title: "Total number active members.",
  });
  const [totalEarning, setTotalEarning] = React.useState({
    count: "...",
    heading: "Total Earning",
    title: "Total earnings this month",
  });
  const getSummary = async () => {
    const response = await axiosFetch("library/summary");
    if (response.status == "success") {
      setIssuedBooks((prev) => ({ ...prev, count: response.data.issue_count }));
      setMembersCount((prev) => ({
        ...prev,
        count: response.data.members_count,
      }));
      setTotalBooks((prev) => ({ ...prev, count: response.data.books_count }));
      setTotalEarning((prev) => ({
        ...prev,
        count: response.data.month_count,
      }));
    }
  };
  React.useEffect(() => {
    getSummary();
  }, []);
  return (
    <div className="home">
      <h1>Home</h1>
      <div className="card-structure">
        <div className="top">
          <BasicCard data={totalBooks} />
          <BasicCard data={issuedBooks} />
        </div>
        <div className="bottom">
          <BasicCard data={totalEarning} />
          <BasicCard data={membersCount} />
        </div>
      </div>
    </div>
  );
}
