import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import cross from "../../assets/cross.svg";
import magnify from "../../assets/magnify.svg";
import greenTick from "../../assets/greenTick.svg";
import { useState, useEffect } from "react";
import { data } from "./data";
import "./search.css";
const style = {
    boxShadow: 24,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -35%)",
    width: "410px",
    height: "461px",
    backgroundColor: "#1B192D",
    border: "1px solid #181627",
    borderRadius: "18px",
    outline: "none",
};

export default function BasicModal({ open, handleClose }) {
    const [searchData, setSearchData] = useState(data);
    const [socket, setSocket] = useState(null);
    const [selectedToken, setSelectedToken] = useState(null);
    const [tokenValue, setTokenValue] = useState(0);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        // Create a new WebSocket object with the Binance endpoint URL

        if (selectedToken) setLoader(true);

        const newSocket = new WebSocket("wss://stream.binance.com:9443/ws");

        // Listen for the WebSocket connection to open
        newSocket.addEventListener("open", () => {
            // Subscribe to the trade stream for the selected token
            if (selectedToken) {
                const streamName = tokenList[selectedToken - 1].toLowerCase() + "@trade";

                newSocket.send(JSON.stringify({ method: "SUBSCRIBE", params: [streamName], id: 1 }));
            }
        });

        // Listen for incoming WebSocket messages
        newSocket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            if (message.e === "trade" && message.s === tokenList[selectedToken - 1]) {
                setTokenValue(parseFloat(message.p).toFixed(2));
                sessionStorage.setItem("tokenAmount", parseFloat(message.p).toFixed(2));
                sessionStorage.setItem("tokenName", data[selectedToken - 1]);
                sessionStorage.setItem("slectedIndex", selectedToken);

                setLoader(false);
            }
        });

        // Save the WebSocket object to state
        setSocket(newSocket);

        // Clean up function to close the WebSocket connection when the component unmounts
        return () => {
            newSocket.close();
        };
    }, [selectedToken]);
    const Close = () => {
        handleClose();
    };
    const tokenList = [
        "BNBBTC",
        "ETHUSDT",
        "BNBUSDT",
        "ADAUSDT",
        "SOLUSDT",
        "XRPUSDT",
        "DOTUSDT",
        "DOGEUSDT",
        "LUNAUSDT",
        "ATOMUSDT",
        "ALGOUSDT",
        "ICPUSDT",
        "FILUSDT",
        "MATICUSDT",
        "AVAXUSDT",
        "LINKUSDT",
        "UNIUSDT",
        "SUSHIUSDT",
        "YFIUSDT",
        "AAVEUSDT",
    ];

    const handleChange = (value) => {
        const filtered = data.filter((data) => String(data.toLowerCase()).startsWith(value));
        setSearchData(filtered);
    };

    return (
        <div>
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <div>
                        <div onClick={Close} className="cross-btn">
                            <img src={cross} />
                        </div>
                        <div style={{ padding: "14px 45px" }}>
                            <div className="search-box">
                                <img src={magnify} />
                                <input
                                    onChange={(e) => handleChange(e.target.value)}
                                    placeholder="Search chains"
                                ></input>
                            </div>
                            <div className="loader">{loader && <CircularProgress />}</div>

                            <div className="search-result">
                                {searchData.map((item, index) => {
                                    return (
                                        <div key={index} className="select-token">
                                            <p
                                                key={index}
                                                onClick={() => setSelectedToken(index + 1)}
                                                style={{ color: "#FFF" }}
                                            >
                                                {item}
                                            </p>
                                            {selectedToken && selectedToken == index + 1 && <img src={greenTick} />}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
