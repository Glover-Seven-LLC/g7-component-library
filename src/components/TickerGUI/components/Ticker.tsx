import React, { useState, useEffect } from "react";
import { TickerData } from "../models/tickerModel.js";
import styles from "../styles/Ticker.module.css"
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
import {numberTextConverter} from "../../../utils/numberConverter";
import TokenFormatter from "../../TokenFormatter/component/TokenFormatter"; // Horizontal three-dot menu

// FontAwesome Social Icon Mapping
/**
 * An object representing a collection of social media icons.
 * The keys are strings corresponding to the name or identifier of social media platforms or links,
 * and the values are icons associated with those platforms.
 * This structure is used to map a platform name to its corresponding icon representation.
 */
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

/**
 * Represents the properties for the Ticker component. This interface is used to define the
 * configurable options and data requirements for the Ticker implementation.
 *
 * @interface
 * @property {TickerData} data - The Ticker data to be displayed, including token or symbol information.
 * @property {boolean} [showWalletBalance] - Optional flag indicating whether to display the wallet balance.
 * @property {number} [maxTokenLength] - Optional maximum allowed length for a token or symbol value.
 */
interface TickerProps {
    data: TickerData;
    showWalletBalance?: boolean; // Optional flag to show Wallet Balance
    maxTokenLength?: number
}

/**
 * TickerGUI is a functional React component responsible for rendering a ticker UI for cryptocurrency tokens.
 * It displays token information, price updates, social media links, user wallet balance, and additional stats
 * like market cap and liquidity. The component includes mechanisms for price flash effects and a social links dropdown.
 *
 * @type {React.FC<TickerProps>}
 *
 * @param {TickerProps} data - Contains the token and user-specific information including token price,
 *                             user wallet balance, and other metadata necessary for rendering.
 *
 * @param {boolean} [showWalletBalance=true] - Determines whether the user's wallet balance should be displayed
 *                                             in the UI. Defaults to true.
 *
 * @param {number} [maxTokenLength=16] - Specifies the maximum length of the formatted token values. Defaults to 16.
 */
const TickerGUI: React.FC<TickerProps> = ({ data, showWalletBalance = true, maxTokenLength = 16 }) => {
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
                <span className={`${styles.price} ${flashClass}`}>
                    $ <TokenFormatter value={data.tokenPrice} size={"x-large"} maxLength={maxTokenLength}/>
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
                        <span className={styles.statsTitle}>Wallet</span>
                        <span className={styles.statsValue}>{numberTextConverter(data.userTokenBalance)} {data.tokenPrimary.tokenSymbol}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TickerGUI;
