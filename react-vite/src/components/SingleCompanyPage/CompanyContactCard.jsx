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
                <div className="businessContact">
                    {company.website &&
                        <>
                            <div className="businessWebsiteContainer">
                                <div className="businessCardDetail"><a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></div>
                                <div className="businessContactIcon"><a href={company.website} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-arrow-up-right-from-square"></i></a></div>
                            </div>
                            <hr />
                        </>
                    }
                    {company.phone &&
                        <>
                            <div className="businessPhoneContainer">
                                <div className="businessCardDetail"><a href={`tel:{company.phone}`} target="_blank" rel="noopener noreferrer">{company.phone && phoneFormat(company.phone)}</a></div>
                                <div className="businessContactIcon"><a href={`tel:{company.phone}`} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-phone-volume"></i></a></div>
                            </div>
                            <hr />
                        </>
                    }
                    {company.city &&
                        <>
                            <div className="businessAddressContainer">
                                <div className="businessAddress">
                                    <div>
                                        {company.address && company.city ? (
                                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${company.address}+${company.city}+${company.state}+${company.zip_code}`} target="_blank" rel="noopener noreferrer">Get Directions</a>
                                        ) : (
                                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${company.city}+${company.state}+${company.zip_code}`} target="_blank" rel="noopener noreferrer">Get Directions</a>
                                        )}
                                    </div>
                                    <div className="businessCardDetail">{company.address} {company.city}, {company.state} {company.zip_code}</div>
                                </div>
                                <div className="businessContactIcon">
                                    {company.address && company.city ? (
                                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${company.address}+${company.city}+${company.state}+${company.zip_code}`} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-diamond-turn-right"></i></a>
                                    ) : (
                                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${company.city}+${company.state}+${company.zip_code}`} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-diamond-turn-right"></i></a>
                                    )
                                    }

                                </div>
                            </div>
                        </>
                    }
                </div>
            }

        </>
    )
}

export default CompanyContactCard
