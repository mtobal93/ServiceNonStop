import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createCompanyThunk, loadACompanyThunk, createCompanyImageThunk, updateCompanyThunk } from "../../redux/companies"
import "./CreateCompany.css"
import { stdTimeFormat } from "../../utils"


function CreateCompanyPage({ company, formType }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector(state => state.session.user)

  const [address, setAddress] = useState(company?.address);
  const [city, setCity] = useState(company?.city);
  const [state, setState] = useState(company?.state);
  const [zip_code, setZip_code] = useState(company?.zip_code);
  const [name, setName] = useState(company?.name);
  const [description, setDescription] = useState(company?.description);
  const [price, setPrice] = useState(company?.price)
  const [email, setEmail] = useState(company?.email);
  const [website, setWebsite] = useState(company?.website);
  const [phone, setPhone] = useState(company?.phone);
  const [category_id, setCategory_id] = useState(company?.category_id);
  const [set_hours, setSet_hours] = useState(company?.set_hours);
  const [mon_open, setMon_open] = useState(company?.hours?.mon_open);
  const [mon_close, setMon_close] = useState(company?.hours?.mon_close);
  const [tues_open, setTue_open] = useState(company?.hours?.tues_open);
  const [tues_close, setTue_close] = useState(company?.hours?.tues_close);
  const [wed_open, setWed_open] = useState(company?.hours?.wed_open);
  const [wed_close, setWed_close] = useState(company?.hours?.wed_close);
  const [thu_open, setThu_open] = useState(company?.hours?.thu_open);
  const [thu_close, setThu_close] = useState(company?.hours?.thu_close);
  const [fri_open, setFri_open] = useState(company?.hours?.fri_open);
  const [fri_close, setFri_close] = useState(company?.hours?.fri_close);
  const [sat_open, setSat_open] = useState(company?.hours?.sat_open);
  const [sat_close, setSat_close] = useState(company?.hours?.sat_close);
  const [sun_open, setSun_open] = useState(company?.hours?.sun_open);
  const [sun_close, setSun_close] = useState(company?.hours?.sun_close);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updatePrice = (selectedPrice) => {
    if (price === selectedPrice) {
      // If the same price is already selected, deselect it
      setPrice('');
    } else {
      // Otherwise, update the selected price
      setPrice(selectedPrice);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({})
    company = {
      ...company, address, city, state, zip_code, name, description,
      price, email, website, phone, category_id, set_hours, mon_open,
      mon_close,
      tues_open,
      tues_close,
      wed_open,
      wed_close,
      thu_open,
      thu_close,
      fri_open,
      fri_close,
      sat_open,
      sat_close,
      sun_open,
      sun_close,
    };

    if (formType === "Update Company") {
      const editedCompany = await dispatch(updateCompanyThunk(company));
      company = editedCompany;

    } else if (formType === 'Create Company') {
      const newCompany = await dispatch(createCompanyThunk(company));
      company = newCompany;

    }

    if (company.errors) {
      setErrors(company.errors);
    } else {
      navigate(`/companies/${company.id}`)
    }
    // Dispatch createCompanyThunk action
    if (formType === 'Create Company') {
      const companyId = company.id; // Extract company ID from response

      const formData = new FormData();
      formData.append("image", image);
      formData.append("uploaded_by_id", sessionUser.id);
      formData.append("imageable_id", companyId); // Pass company ID
      formData.append("imageable_type", "company"); // Hardcoded for company type

      setImageLoading(true);
      // Dispatch createCompanyImageThunk action with formData
      await dispatch(createCompanyImageThunk(formData)).then(() => {
        dispatch(loadACompanyThunk(companyId))
          .then(() => navigate(`/companies/${companyId}`));
      }).catch((error) => {
        console.error("Error uploading image:", error);
        setImageLoading(false);
      });

    }
  }

  const isValidUrl = (url) => {
    // Regular expression for basic URL validation
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for 10-digit phone number without symbols
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const states = ['AL', 'AK', 'AZ', 'AR',
    'CA', 'CO', 'CT', 'DE', 'DC',
    'FL', 'GA', 'HI', 'ID', 'IL',
    'IN', 'IA', 'KS', 'KY', 'LA',
    'ME', 'MD', 'MA', 'MI', 'MN',
    'MS', 'MO', 'MT', 'NE', 'NV',
    'NH', 'NJ', 'NM', 'NY', 'NC',
    'ND', 'OH', 'OK', 'OR', 'PA',
    'RI', 'SC', 'SD', 'TN', 'TX',
    'UT', 'VT', 'VI', 'VA', 'WA',
    'WV', 'WI', 'WY']

  const categories = ['Construction', 'Electrician', 'Landscaper', 'Masonry',
    'Painter', 'Plumber', 'HVAC & Refrigeration', 'Other']

  const hours = ['0000', '0100', '0200', '0300', '0400', '0500', '0600', '0700', '0800', '0900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2100', '2200', '2300', '2400']


  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errObj = {}
    if (!address) errObj.address = "Address is required."
    if (address.trim().length < 1) errObj.address = "Address is required."
    if (!city) errObj.city = "City is required."
    if (city.trim().length < 1) errObj.city = "City is required."
    if (!state) errObj.state = "State is required."
    if (!zip_code || zip_code.trim().length < 5) errObj.zip_code = "ZIP Code is required."
    if (zip_code.trim().length > 5) errObj.zip_code = "ZIP Code is invalid."
    if (!name) errObj.name = "Company name is required."
    if (name.trim().length < 1) errObj.name = "Company name is required."
    if (name.length > 100) errObj.name = "Company name must be less than 100 characters."
    if (!description) errObj.description = "Description is required."
    if (description.trim().length < 1) errObj.description = "Description is required."
    if (!category_id) errObj.category_id = "Category is required."
    if (description.length >= 1 && description.length < 30 || description.length > 255) errObj.description = "Description must be between 30 and 255 characters."
    if (website && !isValidUrl(website)) errObj.website = "Website is not valid."
    if (email && !emailRegex.test(email)) errObj.email = "Email is invalid."
    if (phone && !isValidPhoneNumber(phone)) errObj.phone = "Phone number is invalid. (Numerical digits only—no special characters or spaces.)"
    if (phone && phone.length >= 1 && phone.length > 10) errObj.phone = "Phone number must be 10 digits."
    if (!image && formType === 'Create Company') errObj.image = "Image is required."
    // if (image && image.name.split('.').pop() !== "png" && image.name.split('.').pop() !== "jpg" && image.name.split('.').pop() !== "jpeg") errObj.image = "Image URL must end in .png, .jpg, or .jpeg"
    if (set_hours !== "yes" && set_hours !== "no") errObj.set_hours = "Selection is required."
    if (set_hours === undefined) errObj.set_hours = "Selection is required."
    if (set_hours === "yes" && !mon_open && !tues_open && !wed_open && !thu_open && !fri_open && !sat_open && !sun_open) errObj.hours = "Hours are required if you have set hours."
    if (
      (mon_open && !mon_close) || (!mon_open && mon_close) ||
      (tues_open && !tues_close) || (!tues_open && tues_close) ||
      (wed_open && !wed_close) || (!wed_open && wed_close) ||
      (thu_open && !thu_close) || (!thu_open && thu_close) ||
      (fri_open && !fri_close) || (!fri_open && fri_close) ||
      (sat_open && !sat_close) || (!sat_open && sat_close) ||
      (sun_open && !sun_close) || (!sun_open && sun_close)) errObj.hours = "Hours must have both open and close times."
    if (
      (mon_open && Number(mon_open) >= Number(mon_close)) ||
      (tues_open && Number(tues_open) >= Number(tues_close)) ||
      (wed_open && Number(wed_open) >= Number(wed_close)) ||
      (thu_open && Number(thu_open) >= Number(thu_close)) ||
      (fri_open && Number(fri_open) >= Number(fri_close)) ||
      (sat_open && Number(sat_open) >= Number(sat_close)) ||
      (sun_open && Number(sun_open) >= Number(sun_close))) errObj.hours = "Open time must be before close time."
    setErrors(errObj)
  }, [address, formType, city, state, zip_code, name, description, website, email, phone, category_id, image, set_hours, mon_open, mon_close, tues_open, tues_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close])

  return (
    <>
      {sessionUser &&
        <form className="createBizForm" onSubmit={handleSubmit} encType="multipart/form-data">
          {formType && formType === "Update Company" && <h1>Update Your Company Details!</h1>}
          {formType && formType === "Create Company" && <h1>Add Your Company to Service Non Stop!</h1>}
          <select className="inputFields"
            value={category_id}
            onChange={(e) => setCategory_id(e.target.value)}
            name="category"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={category} value={index + 1}>
                {category}
              </option>
            ))}
          </select>
          {errors.category_id && <span className="errors">&nbsp;{errors.category_id}</span>}
          <input className="inputFields"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Company Name"
            name="name"
          />
          {errors.name && <span className="errors">&nbsp;{errors.name}</span>}
          <input className="inputFields"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            name="address"
          />
          {errors.address && <span className="errors">&nbsp;{errors.address}</span>}
          <input className="inputFields"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            name="city"
          />
          {errors.city && <span className="errors">&nbsp;{errors.city}</span>}
          <select className="inputFields"
            value={state}
            onChange={(e) => setState(e.target.value)}
            name="state"
          >
            <option value="">Select State</option>
            {states.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
          </select>
          {errors.state && <span className="errors">&nbsp;{errors.state}</span>}
          <input className="inputFields"
            type="text"
            value={zip_code}
            onChange={(e) => setZip_code(e.target.value)}
            placeholder="ZIP Code"
            name="zip_code"
          />
          {errors.zip_code && <span className="errors">&nbsp;{errors.zip_code}</span>}
          <textarea className="inputFields"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            name="description"
            rows="5"
          />
          {errors.description && <span className="errors">&nbsp;{errors.description}</span>}
          <div className="inputFields" style={{ marginLeft: "3px" }}>
            Does your company have set hours?:&nbsp;
            <label>
              <input
                type="radio"
                value="yes"
                name="set_hours"
                defaultChecked={set_hours == "yes"}
                onClick={() => setSet_hours("yes")}
              />Yes
            </label>
            <label>
              <input
                type="radio"
                value="no"
                name="set_hours"
                defaultChecked={set_hours == "no"}
                onClick={() => setSet_hours("no")}
              />No
            </label>
          </div>
          {errors.set_hours && <span className="errors">&nbsp;{errors.set_hours}</span>}
          <div className={set_hours == "yes" ? "hoursForm" : "hidden"}>

            <span>Monday:&nbsp;</span>
            <div>
              <select className="inputFields"
                value={mon_open}
                onChange={(e) => setMon_open(e.target.value)}
                name="mon_open"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>&nbsp;&nbsp;to&nbsp;&nbsp;
              <select className="inputFields"
                value={mon_close}
                onChange={(e) => setMon_close(e.target.value)}
                name="mon_close"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>
            </div>


            <span>Tuesday:&nbsp;</span>
            <div>
              <select className="inputFields"
                value={tues_open}
                onChange={(e) => setTue_open(e.target.value)}
                name="tues_open"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>&nbsp;&nbsp;to&nbsp;&nbsp;
              <select className="inputFields"
                value={tues_close}
                onChange={(e) => setTue_close(e.target.value)}
                name="tues_close"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>
            </div>


            <span>Wednesday:&nbsp;</span>
            <div>
              <select className="inputFields"
                value={wed_open}
                onChange={(e) => setWed_open(e.target.value)}
                name="wed_open"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>&nbsp;&nbsp;to&nbsp;&nbsp;
              <select className="inputFields"
                value={wed_close}
                onChange={(e) => setWed_close(e.target.value)}
                name="wed_close"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>
            </div>


            <span>Thursday:&nbsp;</span>
            <div>
              <select className="inputFields"
                value={thu_open}
                onChange={(e) => setThu_open(e.target.value)}
                name="thu_open"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>&nbsp;&nbsp;to&nbsp;&nbsp;
              <select className="inputFields"
                value={thu_close}
                onChange={(e) => setThu_close(e.target.value)}
                name="thu_close"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>
            </div>


            <span>Friday:&nbsp;</span>
            <div>
              <select className="inputFields"
                value={fri_open}
                onChange={(e) => setFri_open(e.target.value)}
                name="fri_open"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>&nbsp;&nbsp;to&nbsp;&nbsp;
              <select className="inputFields"
                value={fri_close}
                onChange={(e) => setFri_close(e.target.value)}
                name="fri_close"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>
            </div>


            <span>Saturday:&nbsp;</span>
            <div>
              <select className="inputFields"
                value={sat_open}
                onChange={(e) => setSat_open(e.target.value)}
                name="sat_open"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>&nbsp;&nbsp;to&nbsp;&nbsp;
              <select className="inputFields"
                value={sat_close}
                onChange={(e) => setSat_close(e.target.value)}
                name="sat_close"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>
            </div>


            <span>Sunday:&nbsp;</span>
            <div>
              <select className="inputFields"
                value={sun_open}
                onChange={(e) => setSun_open(e.target.value)}
                name="sun_open"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>&nbsp;&nbsp;to&nbsp;&nbsp;
              <select className="inputFields"
                value={sun_close}
                onChange={(e) => setSun_close(e.target.value)}
                name="sun_close"
              >
                <option value="">-</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {stdTimeFormat(hour)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.hours && <span className="errors">&nbsp;{errors.hours}</span>}

          <input className="inputFields"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website"
            name="website"
          />
          {errors.website && <span className="errors">&nbsp;{errors.website}</span>}
          <input className="inputFields"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            name="email"
          />
          {errors.email && <span className="errors">&nbsp;{errors.email}</span>}
          <input className="inputFields"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            name="phone"
          />
          {errors.phone && <span className="errors">&nbsp;{errors.phone}</span>}
          <div className="inputFields" style={{ marginLeft: "3px" }}>
            Price (Optional):&nbsp;
            {["$", "$$", "$$$", "$$$$"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={price == option}
                  onClick={() => updatePrice(option)}
                  onChange={() => { }}
                />
                {option}
              </label>
            ))}
          </div>
          {formType && formType === 'Create Company' &&
            <span className="inputFields" >
              <input className="imageInput"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errors.image && <div className="errorsImage">&nbsp;{errors.image}</div>}
              {(imageLoading) && <p>Loading...</p>}
            </span>
          }
          <button type="submit" className="inputFields" disabled={!!Object.values(errors).length}> {formType}</button>
        </form >
      }
    </>
  )
}

export default CreateCompanyPage
