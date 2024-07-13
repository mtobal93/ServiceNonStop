
import "./ShareModal.css";
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, EmailShareButton, EmailIcon, LinkedinIcon, LinkedinShareButton, WhatsappShareButton, WhatsappIcon } from "react-share";

function ShareModal() {
    const url = location.href;
    // const [copySuccess, setCopySuccess] = useState("");
    // const textAreaRef = useRef(null);

    const copyUrl = async () => {
        await navigator.clipboard.writeText(url);
        // setCopySuccess("Copied!");
    }

    return (
        <div className="shareModal">
            <h1>Recommend the Company with people you know</h1>
            <div className="shareOptions">
                <div className="shareIcons">

                    <LinkedinShareButton
                        url={url}
                    >
                            <LinkedinIcon size={32} round/>
                    </LinkedinShareButton>

                    <TwitterShareButton
                        url={url}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>


                    <FacebookShareButton
                        url={url}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <WhatsappShareButton
                        url={url}
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>


                    <EmailShareButton
                        url={url}
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>

                </div>
                <div className="copyUrl">
                    <input type="text" value={url} readOnly />
                    <a onClick={copyUrl}><i className="fa-regular fa-copy" /> Copy link</a>
                </div>
            </div>
        </div>
    )
}

export default ShareModal;
