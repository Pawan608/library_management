import "./App.css";
import Sidebar from "./components/dashboard/dashboard";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Books from "./pages/books/books";
import Members from "./pages/members/members";
import Transactions from "./pages/transaction/transcation";
// import DataTable from "./layouts/import-table";
import { useCSRFstore } from "./store/zustandstore";
import { axiosFetch } from "./axios/axiosFetch";
import React from "react";
import Snackbars from "./components/snackbar";

function App() {
  const { setCSRF } = useCSRFstore();
  const getCSRFValue = async () => {
    const response = await axiosFetch("library/books/csrf");
    if (typeof response == "string") setCSRF(response);
  };
  React.useEffect(() => {
    getCSRFValue();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Snackbars>
              <Sidebar />
            </Snackbars>
          }
        >
          <Route
            index
            element={
              <Snackbars>
                <Home />
              </Snackbars>
            }
          />
          <Route
            path="/books"
            element={
              <Snackbars>
                <Books />
              </Snackbars>
            }
          />
          <Route
            path="/members"
            element={
              <Snackbars>
                <Members />
              </Snackbars>
            }
          />
          <Route
            path="/transactions"
            element={
              <Snackbars>
                <Transactions />
              </Snackbars>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
