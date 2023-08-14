const issueColumns = [
    { id: "date", align: "left", label: "Issue Date" },
    { id: "id", align: "left", label: "MemberID" },
    { id: "isbn", align: "left", label: "ISBN" },
  
];

function issueCreateData(date, id, isbn) {
  return { date, id, isbn };
}

export {
    issueColumns,
    issueCreateData
}