import React from "react";
import { TickerData } from "../models/tickerModel";
import styles from "../styles/Ticker.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXTwitter, faTelegram, faDiscord, faInstagram, faMedium,
    faYoutube, faGithub, faReddit
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { numberTextConverter } from "../../../utils/numberConverter";

// FontAwesome Social Icon Mapping
const socialIcons: { [key: string]: any } = {
    x: faXTwitter, telegram: faTelegram, email: faEnvelope, discord: faDiscord,
    instagram: faInstagram, medium: faMedium, website: faGlobe,
    youtube: faYoutube, github: faGithub, reddit: faReddit,
};

type TickerSize = "small" | "medium" | "large" | "x-large";

interface TickerProps {
    data: TickerData;
    showWalletBalance?: boolean;
    size?: TickerSize;
}

const Ticker: React.FC<TickerProps> = ({ data, showWalletBalance = true, size = "small" }) => {
    return (
        <div className={`${styles.ticker} ${styles[size]}`}>
            {/* Header */}
            <div className={styles.tickerHeader}>
                <div className={styles.tokenContainer}>
                    <img src={data.tokenPrimary.tokenImageURL} alt={data.tokenPrimary.tokenName} className={styles.tokenImg} />
                </div>
                <div className={styles.tokenInfo}>
                    <span className={styles.tokenPair}>
                        {data.tokenPrimary.tokenSymbol}
                        <a href={data.tokenPrimary.tokenContractInfoUrl} target="_blank" rel="noopener noreferrer" className={styles.contractLink}>
                            🔗
                        </a>
                        / {data.tokenPair.tokenSymbol}
                    </span>
                    <div className={styles.chainDetails}>
                        <img src={data.chainLogo} alt="Chain Logo" className={styles.chainLogo} />
                        <span>{data.chainName}</span>
                    </div>
                </div>
            </div>

            {/* Price & Social Icons */}
            <div className={styles.priceRow}>
                <span className={styles.price}>${data.tokenPrice.toFixed(6)}</span>
                <div className={styles.socialIcons}>
                    {Object.entries(data.socialLinks || {}).slice(0, 2).map(([key, url]) => (
                        <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <FontAwesomeIcon icon={socialIcons[key]} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Wallet Balance */}
            {showWalletBalance && data.userTokenBalance > 0 && (
                <p className={styles.walletBalance}>
                    Wallet: {numberTextConverter(data.userTokenBalance)} /
                    ${data.userTokenBalance * data.tokenPrice}
                </p>
            )}

            {/* Bottom Stats */}
            <div className={styles.statsRow}>
                <div className={styles.statsColumn}><span className={styles.statsTitle}>Liquidity</span><span className={styles.statsValue}>${numberTextConverter(data.liquidity)}</span></div>
                <div className={styles.statsColumn}><span className={styles.statsTitle}>M Cap</span><span className={styles.statsValue}>${numberTextConverter(data.marketCap)}</span></div>
                {showWalletBalance && <div className={styles.statsColumn}><span className={styles.statsTitle}>Total Supply</span><span className={styles.statsValue}>{numberTextConverter(data.totalSupply)}</span></div>}
            </div>
        </div>
    );
};

export default Ticker;
