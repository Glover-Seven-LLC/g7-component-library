import React, { useState, useEffect } from "react";
import { TickerData } from "../models/tickerModel";
import styles from "../styles/Ticker.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXTwitter,
    faTelegram,
    faDiscord,
    faInstagram,
    faMedium,
    faYoutube,
    faGithub,
    faReddit,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faGlobe, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {numberTextConverter} from "../../../utils/numberConverter"; // Horizontal three-dot menu

// TODO Make Carmen adjust standard as Small and update with the new scaling code
// TODO Update this ticker code because it is a old version
// TODO add option to show or collapse zero - not a priority

// FontAwesome Social Icon Mapping
const socialIcons: { [key: string]: any } = {
    x: faXTwitter,
    telegram: faTelegram,
    email: faEnvelope,
    discord: faDiscord,
    instagram: faInstagram,
    medium: faMedium,
    website: faGlobe,
    youtube: faYoutube,
    github: faGithub,
    reddit: faReddit,
};

interface TickerProps {
    data: TickerData;
    showWalletBalance?: boolean; // Optional flag to show Wallet Balance
}

const Ticker: React.FC<TickerProps> = ({ data, showWalletBalance = true }) => {
    const [prevPrice, setPrevPrice] = useState<number>(data.tokenPrice);
    const [flashClass, setFlashClass] = useState(styles.priceNeutral);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (data.tokenPrice > prevPrice) {
            setFlashClass(styles.priceUp);
        } else if (data.tokenPrice < prevPrice) {
            setFlashClass(styles.priceDown);
        }
        setPrevPrice(data.tokenPrice);

        // Reset the flash effect after 1 second
        const timeout = setTimeout(() => setFlashClass(styles.priceNeutral), 1000);
        return () => clearTimeout(timeout);
    }, [data.tokenPrice]);

    // Calculate Wallet USD Value
    const walletValue = data.userTokenBalance * data.tokenPrice;
    const displayWalletValue = showWalletBalance && data.userTokenBalance > 0;

    // Extract active social links
    const socialEntries = Object.entries(data.socialLinks || {}).filter(([_, url]) => url);
    const visibleIcons = socialEntries.slice(0, 2);
    const hiddenIcons = socialEntries.slice(2);

    return (
        <div className={styles.ticker}>
            {/* Header: Token Image + Token Info */}
            <div className={styles.tickerHeader}>
                <div className={styles.tokenContainer}>
                    <img
                        src={data.tokenPrimary.tokenImageURL}
                        alt={data.tokenPrimary.tokenName}
                        className={styles.tokenImg}
                    />
                </div>
                <div className={styles.tokenInfo}>
                    <span className={styles.tokenPair}>
                        {data.tokenPrimary.tokenSymbol}
                        <a
                            href={data.tokenPrimary.tokenContractInfoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.contractLink}
                            title={data.tokenPrimary.tokenContract}
                        >
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

            {/* Price & Social Icons Section */}
            <div className={styles.priceRow}>
                {/* Price */}
                <span className={`${styles.price} ${flashClass} ml-auto`}>
                    ${data.tokenPrice.toFixed(6)}
                </span>

                {/* Social Icons */}
                <div className={styles.socialIcons}>
                    {visibleIcons.map(([key, url]) => (
                        <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <FontAwesomeIcon icon={socialIcons[key]} />
                        </a>
                    ))}

                    {/* Three-dot menu button */}
                    {hiddenIcons.length > 0 && (
                        <button
                            className={styles.threeDotsButton}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <FontAwesomeIcon icon={faEllipsisH} /> {/* Horizontal three dots */}
                        </button>
                    )}

                    {/* Hidden Social Icons in Dropdown (Dropdown now opens downwards) */}
                    {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            {hiddenIcons.map(([key, url]) => (
                                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                    <FontAwesomeIcon icon={socialIcons[key]} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Wallet Balance (Directly Below Price & Socials) */}
            {displayWalletValue && (
                <p className={styles.walletBalance}>
                    Wallet: {numberTextConverter(data.userTokenBalance)} /
                    ${walletValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            )}

            {/* Bottom Stats Row */}
            <div className={styles.statsRow}>
                {/* Liquidity Column */}
                <div className={styles.statsColumn}>
                    <span className={styles.statsTitle}>Liquidity</span>
                    <span className={styles.statsValue}>${numberTextConverter(data.liquidity)}</span>
                </div>

                {/* Market Cap Column */}
                <div className={styles.statsColumn}>
                    <span className={styles.statsTitle}>M Cap</span>
                    <span className={styles.statsValue}>${numberTextConverter(data.marketCap)}</span>
                </div>

                {/* Wallet Column (Only Token Amount) */}
                {showWalletBalance && (
                    <div className={styles.statsColumn}>
                        <span className={styles.statsTitle}>Total Supply</span>
                        <span className={styles.statsValue}>{numberTextConverter(data.totalSupply)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ticker;