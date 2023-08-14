const returnColumns = [
    { id: "date", align: "left", label: "Return Date" },
    { id: "id", align: "left", label: "MemberID" },
    { id: "isbn", align: "left", label: "ISBN" },
    { id: "rent", align: "center", label: "Rent Collected"}
];

function returnCreateData(date, id, isbn, rent) {
  return { date, id, isbn, rent };
}

export {
    returnColumns,
    returnCreateData
}