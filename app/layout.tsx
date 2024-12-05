'use client'
import "./globals.css";
import Header from "./component/Header";
import { store } from "../store";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Provider store={store}>
          <Header/>
        {children}
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />
        </Provider>
      </body>
    </html>
  );
}
