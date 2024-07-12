import './SingleCompany.css';

function CompanyContactCard({ company, isDesktop }) {
    const phoneFormat = (phone) => {
        let areaCode = phone.slice(0, 3);
        let firstThree = phone.slice(3, 6);
        let lastFour = phone.slice(6, 10);

        return `(${areaCode}) ${firstThree}-${lastFour}`
    }


    return (
        <>
            {isDesktop &&
                <div className="bizContactDesk">
                    {company.website && (
                        <div>
                            <div className="businessWebsiteContainer">
                                <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="businessContactIcon">
                                        <i className="fa-solid fa-earth-americas"></i>
                                    </div>
                                    <div>Website</div>
                                </a>
                            </div>
                        </div>
                    )}
                    {company.phone && (
                        <div>
                            <div className="businessPhoneContainer">
                                <a
                                    href={`tel:{company.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="businessContactIcon">
                                        <i className="fa-solid fa-phone-volume"></i>
                                    </div>
                                    <div>Call</div>
                                </a>
                            </div>
                        </div>
                    )}
                    {company.city && (
                        <div>
                            {company.address && company.city ? (
                                <div className="businessAddressContainer">
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${company.address}+${company.city}+${company.state}+${company.zip_code}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="businessContactIcon">
                                            <i className="fa-solid fa-diamond-turn-right"></i>
                                        </div>
                                        <div>Directions</div>
                                    </a>
                                </div>
                            ) : (
                                <div className="businessAddressContainer">
                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${company.city}+${company.state}+${company.zip_code}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="businessContactIcon">
                                            <i className="fa-solid fa-diamond-turn-right"></i>
                                        </div>
                                        <div>Directions</div>
                                    </a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            }

        </>
    )
}

export default CompanyContactCard
