import "./buycard.css";
import drop from "../../assets/drop.svg";
import etherium from "../../assets/etherium.svg";
import BasicModal from "../SearchModal/search";
import bg from "../../assets/bg.svg";
import { useEffect, useState } from "react";
import { icons } from "../../assets/icons";
import coin0 from "../../assets/coinsLogo/coin1.svg";
import coin1 from "../../assets/coinsLogo/coin2.svg";
import coin2 from "../../assets/coinsLogo/coin3.svg";
import coin3 from "../../assets/coinsLogo/coin4.svg";
import coin4 from "../../assets/coinsLogo/coin5.svg";
import coin5 from "../../assets/coinsLogo/coin6.svg";
import coin6 from "../../assets/coinsLogo/coin7.svg";
import coin7 from "../../assets/coinsLogo/coin8.svg";
import coin8 from "../../assets/coinsLogo/coin8.svg";
import coin9 from "../../assets/coinsLogo/coin10.svg";
import coin10 from "../../assets/coinsLogo/coin11.svg";
import coin11 from "../../assets/coinsLogo/coin12.svg";
import coin12 from "../../assets/coinsLogo/coin13.svg";
import coin13 from "../../assets/coinsLogo/coin14.svg";
import coin14 from "../../assets/coinsLogo/coin15.svg";
import coin15 from "../../assets/coinsLogo/coin16.svg";
import coin16 from "../../assets/coinsLogo/coin17.svg";
import coin17 from "../../assets/coinsLogo/coin18.svg";
import coin18 from "../../assets/coinsLogo/coin19.svg";
import coin19 from "../../assets/coinsLogo/coin20.svg";

const BuyCard = () => {
    const [open, setOpen] = useState(false);
    const [tokenName, setTokenName] = useState(null);
    const [tokenAmount, setTokenAmount] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [returnValue, setReturnValue] = useState("");
    const [investValue, setInvestValue] = useState("");
    const Icons = [
        coin0,
        coin1,
        coin2,
        coin3,
        coin4,
        coin5,
        coin6,
        coin7,
        coin8,
        coin9,
        coin10,
        coin11,
        coin12,
        coin13,
        coin14,
        coin15,
        coin16,
        coin17,
        coin18,
        coin19,
    ];
    const handleOpen = () => {
        sessionStorage.clear();
        setTokenAmount(null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setTokenName(sessionStorage.getItem("tokenName"));
        setTokenAmount(sessionStorage.getItem("tokenAmount"));
        const ind = sessionStorage.getItem("slectedIndex");
        // alert(ind)
        setSelectedIndex(ind);
    }, [sessionStorage.getItem("tokenName")]);

    useEffect(() => {
        setInterval(() => {
            if (!open) setTokenAmount(sessionStorage.getItem("tokenAmount"));
        }, 1000);
    });
    useEffect(() => {
        const ans = investValue / (tokenAmount * 80);
        setReturnValue(ans);
    }, [investValue, tokenAmount]);

    return (
        <div className="buy-card">
            <BasicModal open={open} handleClose={handleClose} />
            <div
                className="card"
                style={{ backgroundImage: `url(${bg})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }}
            >
                <div className="top-notch">
                    {selectedIndex ? (
                        <img height={50} width={50} src={Icons[selectedIndex - 1]} />
                    ) : (
                        <img height={50} width={50} src={Icons[8]} />
                    )}
                </div>
                <div className="coin-value">
                    <p>Current value</p>
                    {tokenAmount != 0 && <p>Rs {parseFloat(tokenAmount * 80).toFixed(2)}</p>}
                </div>
                <div onClick={handleOpen} className="dropdown">
                    <div>
                        {selectedIndex ? <img src={Icons[selectedIndex - 1]} /> : <img src={Icons[8]} />}
                        {tokenName ? (
                            <p style={{ margin: "0px" }}>{tokenName}</p>
                        ) : (
                            <p style={{ margin: "0px" }}>Select Coin</p>
                        )}
                    </div>

                    <img src={drop} />
                </div>
                <div className="invest-value">
                    <p style={{ margin: "0px" }}>Amount you want to invest</p>
                    <div className="invest-input">
                        <input
                            type="tel"
                            placeholder="0.00"
                            onChange={(e) => setInvestValue(e.target.value)}
                            value={investValue}
                        ></input>{" "}
                        <p style={{ marginRight: "24px" }}>INR</p>
                    </div>
                </div>
                <div className="return-value">
                    <p style={{ margin: "0px" }}>Estimate Number of ETH You will Get</p>
                    <div className="return-input">
                        <input type="tel" placeholder={0} disabled value={returnValue}></input>
                    </div>
                </div>
                <button className="buy-button">Buy</button>
            </div>
        </div>
    );
};

export default BuyCard;
