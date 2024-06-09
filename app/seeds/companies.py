from app.models import db, Company, environment, SCHEMA
from sqlalchemy import text


def seed_companies():
    all_weather_heating_and_cooling = Company(
        #! id 1
        owner_id=1,
        category_id=7,
        name="All Weather Heating & Cooling",
        email="info@allweatherhvac.com",
        phone="9192308572",
        address="1412 Old Oxford Rd Suite 500",
        city="Durham",
        state="NC",
        zip_code="27704",
        website="https://www.yourallweatherhvac.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp",
        description="We pride ourselves on efficiency and expertise when it comes to residential and commercial AC, furnace, and heat pump repairs. Our team of technicians and project managers understands what it takes to get your project done right, and we are prepared to make sure it proceeds on the schedule and budget that you want.",
        price="$$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",
    )

    lee_air_conditioning = Company(
        #! id 2
        owner_id=3,
        category_id=7,
        name="Lee Air Conditioning",
        email="info@leeairconditioning.com",
        phone="9193831588",
        address="5109 Neal Rd",
        city="Durham",
        state="NC",
        zip_code="27705",
        website="https://www.leeac.com/",
        description="Lee Air Conditioning is a full-service HVAC contractor in Durham, NC. As a family-owned and operated company since 1951, we provide quality heating and cooling services to residential and commercial customers in Chapel Hill, Durham, Morrisville, Raleigh, NC and the surrounding areas.",
        price="$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",
    )

    forced_air_mechanical = Company(
        #! id 3
        owner_id=5,
        category_id=7,
        name="Forced Air Mechanical",
        email="info@forcedairmech.com",
        phone="9193770075",
        address="233 E Johnson St STE P",
        city="Cary",
        state="NC",
        zip_code="27513",
        website="http://www.forcedairmech.com/",
        description="At Forced Air Mechanical LLC, our core values represent who we are as people and a company and therefore are our top priority. These are critical traits which will promote an atmosphere in which everyone in our company and everyone we come in contact with will benefit from their experience in a positive light. We take these values very seriously and expect any stakeholders within our ranks to do the same.",
        price="$$$$",
        set_hours="yes",
        mon_open="0700",
        mon_close="1600",
        tues_open="0700",
        tues_close="1600",
        wed_open="0700",
        wed_close="1600",
        thu_open="0700",
        thu_close="1600",
        fri_open="0700",
        fri_close="1600",
    )

    edison_heating_and_cooling = Company(
        #! id 4
        owner_id=2,
        category_id=7,
        name="Edison Heating & Cooling",
        phone="7323727161",
        address="191 Vineyard Rd",
        city="Edison",
        state="NJ",
        zip_code="27513",
        website="https://www.edisonhvac.com/?utm_source=gmb&utm_medium=organic",
        description="Founded in 1987, Edison Heating & Cooling built our business by offering quality products that are built to last with service you can count on from people you can trust. We are a full-service heating and cooling company that serves both residential and commercial clients.",
        price="$$$",
        set_hours="yes",
        mon_open="0700",
        mon_close="2100",
        tues_open="0700",
        tues_close="2100",
        wed_open="0700",
        wed_close="2100",
        thu_open="0700",
        thu_close="2100",
        fri_open="0700",
        fri_close="2100",
        sat_open='0800',
        sat_close='1700',
        sun_open='0800',
        sun_close='1700',
    )

    hh_heating_air_conditioning_inc = Company(
        #! id 5
        owner_id=4,
        category_id=7,
        name="H & H Heating and Air Conditioning Inc.",
        email="info@edisonhvac.com",
        phone="6105328744",
        address="3 Industrial Hwy",
        city="Essington",
        state="PA",
        zip_code="19029",
        website="https://www.delcohvac.com/?utm_source=Google&utm_medium=Organic&utm_campaign=GMB",
        description="H & H Heating and Air Conditioning was founded in 1985 and we have established ourselves as the premier local HVAC contractors in the Delaware Valley. Our commitment to quality service and providing a reliable product is our key to success.",
        price="$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",

    )


    commercial_air_refrigeration_and_equipment_services = Company(
        #! id 6
        owner_id=6,
        category_id=7,
        name="Commercial Air Refrigeration and Equipment Services",
        phone="8043300404",
        address="2521 Wayside Dr.",
        city="Richmond",
        state="VA",
        zip_code="23235",
        website="https://commairva.com/",
        description="Commercial Air, Refrigeration and Equipment Services has a winning combination of technical experience coupled with a proven management style that puts you, the customer, first. You can anticipate the highest level of knowledge, professionalism and rapid response that you have come to expect from the big, high priced service providers, but at a greatly reduced cost.",
        price="$$$",
        set_hours="yes",
        mon_open="0700",
        mon_close="1630",
        tues_open="0700",
        tues_close="1630",
        wed_open="0700",
        wed_close="1630",
        thu_open="0700",
        thu_close="1630",
        fri_open="0700",
        fri_close="1630",
    )


    hmd_construction_and_development = Company(
        #! id 7
        owner_id=7,
        category_id=1,
        name="HMD Construction & Development",
        phone="9197914631",
        address="8204 Creedmoor Rd Suite 100",
        city="Raleigh",
        state="NC",
        zip_code="27613",
        website="http://www.hmddevelopment.com/",
        description="HMD is a commercial construction firm focused on steel- and stick-framed construction and development opportunities in the greater Raleigh-Durham/Triangle and surrounding areas of North Carolina. We offer what most construction firms can’t, which is owner representation, real estate development, and financial expertise. The HMD team welcomes the opportunity to become involved in client projects from the very beginning of the building process.",
        price="$$$$$",
        set_hours="yes",
        mon_open="0600",
        mon_close="2200",
        tues_open="0600",
        tues_close="2200",
        wed_open="0600",
        wed_close="2200",
        thu_open="0600",
        thu_close="2200",
        fri_open="0600",
        fri_close="2200",
        sat_open='0600',
        sat_close='1700',
    )


    richard_group = Company(
        #! id 8
        owner_id=8,
        category_id=1,
        name="Richard Group",
        phone="8478592751",
        address="566 W Lake St",
        city="Chicago",
        state="IL",
        zip_code="60661",
        website="http://www.richardgroupllc.com/",
        description="Based in Chicago, Richard is a veteran-owned general contracting & construction management company that serves companies, communities, and mission-critical projects across the United States.",
        price="$$$",
        set_hours="yes",
        mon_open="0730",
        mon_close="1700",
        tues_open="0730",
        tues_close="1700",
        wed_open="0730",
        wed_close="1700",
        thu_open="0730",
        thu_close="1700",
        fri_open="0730",
        fri_close="1700",

    )


    munz_construction = Company(
        #! id 9
        owner_id=9,
        category_id=1,
        name="Munz Construction",
        phone="2159538833",
        address="5201 Buck Rd",
        city="Holland",
        state="PA",
        zip_code="18966",
        website="https://munzconstruction.com/?utm_source=GMB&utm_medium=organic&utm_campaign=1SEO_SM",
        description="At Munz Construction, we are fully insured and feature a highly-specialized team who are professional, punctual, and properly certified. Additionally, each and every one of our employees must pass a background check before being hired. We also feature an extensively-stocked showroom so you can experience your new materials and products firsthand before they’re installed in your project.",
        price="$$$$",
        set_hours="yes",
        mon_open="0900",
        mon_close="1700",
        tues_open="0900",
        tues_close="1700",
        wed_open="0900",
        wed_close="1700",
        thu_open="0900",
        thu_close="1700",
        fri_open="0900",
        fri_close="1700",

    )


    cali_builders_and_construction_inc = Company(
        #! id 10
        owner_id=10,
        category_id=1,
        name="Cali Builders & Construction Inc.",
        phone="8008630011",
        address="15130 Ventura Blvd Suite 250",
        city="Los Angeles",
        state="CA",
        zip_code="91403",
        website="https://cali-builders.com/",
        description="Cali Builders & Construction Inc. Is a family-owned company, located in Los Angeles, California. That specializes in general remodeling and new construction. We truly believe that best projects are done when everyone's voice is heard. We also believe that in order for a project to be successful, a lot of teamwork, coordination, and healthy communication is required by all parties involved.",
        price="$$$$$",
        set_hours="yes",
        mon_open="0900",
        mon_close="1730",
        tues_open="0900",
        tues_close="1730",
        wed_open="0900",
        wed_close="1730",
        thu_open="0900",
        thu_close="1730",
        fri_open="0900",
        fri_close="1730",

    )


    cd_electrical_group = Company(
        #! id 11
        owner_id=3,
        category_id=2,
        name="CA Electrical Group",
        phone="6692600712",
        address="780 Montague Expy Suite 203",
        city="San Jose",
        state="CA",
        zip_code="95131",
        website="https://www.caelectricalgroup.com/",
        description="CA ELECTRICAL GROUP 24/7 offers a wide range of electrical services, including troubleshooting, electrical panel installations, service upgrades, complete rewiring, electrical safety inspections, new construction, and remodeling projects, electric vehicle car charging stations and smart home integration. Let us light up your day!",
        price="$$$",
        set_hours="yes",
        mon_open="0500",
        mon_close="2200",
        tues_open="0500",
        tues_close="2200",
        wed_open="0500",
        wed_close="2200",
        thu_open="0500",
        thu_close="2200",
        fri_open="0500",
        fri_close="2200",
        sat_open='0800',
        sat_close='1700',
        sun_open='0800',
        sun_close='1700',

    )


    kb_electric_inc = Company(
        #! id 12
        owner_id=1,
        category_id=2,
        name="KB Electric Inc",
        phone="97374462011",
        address="78-80 Broughton Ave",
        city="Bloomfield",
        state="NJ",
        zip_code="07003",
        website="http://kbelectricnj.com/",
        description="A Small Business with Local Roots. We focus mainly on Residential & Commercial electricity work.",
        price="$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1600",
        tues_open="0800",
        tues_close="1600",
        wed_open="0800",
        wed_close="1600",
        thu_open="0800",
        thu_close="1600",
        fri_open="0800",
        fri_close="1530",
    )


    tidal_electrical_services_inc = Company(
        #! id 13
        owner_id=7,
        category_id=5,
        name="Tidal Electrical Services, Inc.",
        phone="9197823278",
        address="6613 Fleetwood Dr Suite 100",
        city="Raleigh",
        state="NC",
        zip_code="27612",
        website="https://www.tidalelectricalservices.com/?utm_campaign=gmb&utm_medium=organic&utm_source=gmb",
        description="We employ only the very best with extensive training and expertise. Many of our electricians have been in the business for decades, and have experience in residential, commercial, and industrial electrical service and repair. Our entire team is dedicated to learning the best ways to serve our customers with the most cutting-edge solutions for all your electrical needs.",
        price="$$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",

    )


    central_florida_electrician = Company(
        #! id 14
        owner_id=1,
        category_id=10,
        name="Tidal Electrical Services, Inc.",
        phone="9197823278",
        address="6613 Fleetwood Dr Suite 100",
        city="Raleigh",
        state="NC",
        zip_code="27612",
        website="https://www.tidalelectricalservices.com/?utm_campaign=gmb&utm_medium=organic&utm_source=gmb",
        description="We employ only the very best with extensive training and expertise. Many of our electricians have been in the business for decades, and have experience in residential, commercial, and industrial electrical service and repair. Our entire team is dedicated to learning the best ways to serve our customers with the most cutting-edge solutions for all your electrical needs.",
        price="$$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",

    )


    ground_source_landscaping = Company(
        #! id 15
        owner_id=2,
        category_id=3,
        name="Ground Source Landscaping",
        phone="4073785366",
        address="7395 Hoffner Ave",
        city="Orlando",
        state="FL",
        zip_code="32822",
        website="https://groundsource.pro/",
        description="We don’t mow or weed or fertilize. There are plenty of other guys who do that. We do the kind of high-end landscaping that brings your property from so-so to spectacular. We bring the impressive patios, the cozy fire pits, the mature trees, the showy flower beds and the carpet of emerald green grass that will make you wonder why you’d want to go back inside. ",
        price="$$$$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",

    )


    palmetto_landscaping_and_design = Company(
        #! id 16
        owner_id=5,
        category_id=7,
        name="Palmetto Landscaping and Design",
        phone="8438104998",
        address="598 Orangeburg Road",
        city="Summerville",
        state="SC",
        zip_code="29483",
        website="https://palmettolandscapinganddesign.com/",
        description="We transform your outdoor spaces into places that are usable and enjoyable. We have become the area expert for artificial turf installation, hardscapes, and outdoor entertainment areas like outdoor kitchens, pergolas, and stock tank pools. ",
        price="$$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",

    )


    northern_virginia_landscaping = Company(
        #! id 17
        owner_id=6,
        category_id=3,
        name="Northern Virginia Landscaping",
        phone="7039820100",
        address="3033 Wilson Blvd Suite 700",
        city="Arlington",
        state="VA",
        zip_code="22201",
        website="http://nvalandscaping.com/",
        description="We are so confident in the value of our consultation services that we offer a satisfaction guarantee on every paid consultation. If for any reason you’re not completely satisfied with your consultation, simply let us know and we’ll refund your money. Your satisfaction is our priority.",
        price="$$",
        set_hours="yes",
        mon_open="0900",
        mon_close="1700",
        tues_open="0900",
        tues_close="1700",
        wed_open="0900",
        wed_close="1700",
        thu_open="0900",
        thu_close="1700",
        fri_open="0900",
        fri_close="1700",

    )


    castromasonry = Company(
        #! id 18
        owner_id=1,
        category_id=1,
        name="Castromasonry",
        phone="2407014036",
        address="6319 Tuckerman St",
        city="Riverdale Park",
        state="MD",
        zip_code="20737",
        website="http://www.castromasonry.net/",
        description="We offer professional and reliable services, our extensive experience supports us. At Castro Masonry we are sure that we can help you with any remodeling you have in mind, contact us, you will not regret it your decision.",
        price="$$$",
        set_hours="yes",
        mon_open="0600",
        mon_close="1700",
        tues_open="0600",
        tues_close="1700",
        wed_open="0600",
        wed_close="1700",
        thu_open="0600",
        thu_close="1700",
        fri_open="0600",
        fri_close="1700",
        sat_open='0700',
        sat_close='1600',

    )


    sams_paving = Company(
        #! id 19
        owner_id=4,
        category_id=4,
        name="Sam's Paving",
        phone="6156436085",
        address="1432 Slaters Creek Rd",
        city="Goodlettsville",
        state="TN",
        zip_code="37072",
        website="https://www.samspaving.net/",
        description="Sam's Paving is your place for asphalt paving, concrete, parking lots, seal coating, line striping, and property maintenance. Call us whether you need a repair or new installation.",
        price="$$$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1800",
        tues_open="0800",
        tues_close="1800",
        wed_open="0800",
        wed_close="1800",
        thu_open="0800",
        thu_close="1800",
        fri_open="0800",
        fri_close="1800",
        

    )


    carolina_painting_and_pressure_cleaning_inc = Company(
        #! id 20
        owner_id=2,
        category_id=5,
        name="Carolina Painting and Pressure Cleaning, Inc.",
        phone="8039574567",
        address="214 Bickley Rd",
        city="Lexington",
        state="SC",
        zip_code="29072",
        website="https://changemypaint.com/",
        description="Since first opening the doors in 1987, Carolina Painting and Pressure Cleaning continues to grow its full-service painting company, focusing on unparalleled customer service. We’re happy to have numerous repeat customers who attest to the quality and service we provide, as well as a staff committed to the highest level of professionalism. ",
        price="$$$",
        set_hours="yes",
        mon_open="0730",
        mon_close="1630",
        tues_open="0730",
        tues_close="1630",
        wed_open="0730",
        wed_close="1630",
        thu_open="0730",
        thu_close="1630",
        fri_open="0730",
        fri_close="1630",
        

    )


    painting_contractors_of_md = Company(
        #! id 21
        owner_id=3,
        category_id=5,
        name="Painting Contractors of MD",
        phone="4107958786",
        address="123 Streaker Rd",
        city="Sykesville",
        state="MD",
        zip_code="21784",
        website="http://paintingcontractorsofmd.com/",
        description="Our focus is to provide a higher level workmanship and customer service that far exceeds our competition— which in turn offers more value to our customers. Customer service is our number one priority and we guarantee 100% customer satisfaction.",
        price="$$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",
        

    )


    certapro_painters_of_delaware = Company(
        #! id 22
        owner_id=9,
        category_id=5,
        name="CertaPro Painters of Delaware",
        phone="3022125742",
        address="35603 South St Unit C",
        city="Rehoboth Beach",
        state="DE",
        zip_code="19971",
        website="https://certapro.com/delaware/landing-page/residential-gbp-rehoboth/?y_source=1_MTIzMDY3NzQtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D",
        description="At CertaPro Painters® of Delaware, we know that finding the right team for your painting project can be overwhelming. With our professionals in Rehoboth, DE by your side, the process will be easy and convenient — leaving you time for what matters most.",
        price="$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",
        

    )


    kaufy_painting = Company(
        #! id 23
        owner_id=10,
        category_id=5,
        name="Kaufy Painting",
        phone="6303946445",
        address="515 W Natalie Ln",
        city="Addison",
        state="IL",
        zip_code="60101",
        website="http://www.kaufypainting.com/",
        description="We’ve built our reputation from integrity in getting things done. In Kaufy Painting, we make sure that we get the project done right and give our clients the satisfaction and more.",
        price="$$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",
        

    )


    brown_brothers_plumbing_and_eating = Company(
        #! id 24
        owner_id=3,
        category_id=6,
        name="Brown Brothers Plumbing & Heating",
        phone="9192202554",
        address="2820 N Roxboro St",
        city="Durham",
        state="NC",
        zip_code="27704",
        website="http://www.bbph.com/",
        description="Brown Brothers commitment to quality and service sets us apart from other contractors. Our employees are family oriented and entrusted to perform their duties in a sincere, friendly and trusting manner. ",
        price="$$$",
        set_hours="yes",
        mon_open="0700",
        mon_close="1700",
        tues_open="0700",
        tues_close="1700",
        wed_open="0700",
        wed_close="1700",
        thu_open="0700",
        thu_close="1700",
        fri_open="0700",
        fri_close="1700",
        

    )


    atlanta_plumbing_and_drain = Company(
        #! id 25
        owner_id=8,
        category_id=6,
        name="Atlanta Plumbing & Drain",
        phone="4706938389",
        address="455 Moreland Ave NE Suite 5438",
        city="Atlanta",
        state="GA",
        zip_code="30307",
        website="https://www.atlplumbingcompany.com/",
        description="At Atlanta Plumbing & Drain, we're not just a name; we're a commitment to excellence that runs deep within the heart of Atlanta and surrounding areas. Our story begins with a family legacy of master plumbers, united by a shared passion for delivering unparalleled service.",
        price="$$$$",
        set_hours="yes",
        mon_open="0700",
        mon_close="2100",
        tues_open="0700",
        tues_close="2100",
        wed_open="0700",
        wed_close="2100",
        thu_open="0700",
        thu_close="2100",
        fri_open="0700",
        fri_close="2100",
        sat_open='1000',
        sat_close='1400',

    )


    mc_mullens_plumbing_drain_services = Company(
        #! id 26
        owner_id=6,
        category_id=6,
        name="Mc Mullen's Plumbing-Drain Services",
        phone="6093929796",
        address="5140 Broad St",
        city="Trenton",
        state="NJ",
        zip_code="08620",
        website="http://www.mcmullensplumbing.com/",
        description="With over 30 years of experience and licensed plumbers on staff, you can feel good about our work.",
        price="$$$$",
        set_hours="yes",
        mon_open="0700",
        mon_close="2100",
        tues_open="0700",
        tues_close="2100",
        wed_open="0700",
        wed_close="2100",
        thu_open="0700",
        thu_close="2100",
        fri_open="0700",
        fri_close="2100",
        sat_open='1000',
        sat_close='1400',

    )


    south_coast_welding_and_manufacturing_llc = Company(
        #! id 27
        owner_id=7,
        category_id=8,
        name="South Coast Welding & Manufacturing LLC",
        phone="6194291337",
        address="2591 Faivre St Suite 1",
        city="Chula Vista",
        state="CA",
        zip_code="91911",
        website="http://www.southcoastwelding.net/",
        description="Southcoast Welding & Manufacturing is committed to a Quality Management System, focused on continuous improvement and meeting all customer requirements. Our equipment and facilities enable us to produce parts which meet or exceed the highest quality standards, while reducing costs and increasing value for our customer.",
        price="$$$$",
        set_hours="yes",
        mon_open="0600",
        mon_close="1530",
        tues_open="0600",
        tues_close="1530",
        wed_open="0600",
        wed_close="1530",
        thu_open="0600",
        thu_close="1530",
        fri_open="0600",
        fri_close="1530",
    )


    benavides_welding_works_llc = Company(
        #! id 28
        owner_id=5,
        category_id=8,
        name="Benavides Welding Works LLC",
        phone="2147326178",
        address="104 Whatley Ave",
        city="Lewisville",
        state="TX",
        zip_code="75057",
        website="http://benavidesweldingworks.com/",
        description="From home improvement projects to commercial construction...we have the equipment and expertise needed to take on virtually any job. We can work with your exact specifications or help create a custom design based on your input.",
        price="$$",
        set_hours="yes",
        tues_open="0900",
        tues_close="1700",
        wed_open="0900",
        wed_close="1700",
        thu_open="0900",
        thu_close="1700",
        fri_open="0900",
        fri_close="1700",
    )


    Quality_power_wash_nyc = Company(
        #! id 29
        owner_id=5,
        category_id=8,
        name="Quality Power Wash NYC",
        phone="7189868129",
        address="5308 13th Ave Suite 601",
        city="Brooklyn",
        state="NY",
        zip_code="11219",
        website="http://benavidesweldingworks.com/",
        description="From home improvement projects to commercial construction...we have the equipment and expertise needed to take on virtually any job. We can work with your exact specifications or help create a custom design based on your input.",
        price="$$",
        set_hours="yes",
        mon_open="0900",
        mon_close="1700",
        tues_open="0900",
        tues_close="1700",
        wed_open="0900",
        wed_close="1700",
        thu_open="0900",
        thu_close="1700",
        fri_open="0900",
        fri_close="1700",
    )


    professional_window_cleaning_service_inc = Company(
        #! id 30
        owner_id=10,
        category_id=8,
        name="Professional Window Cleaning Service Inc.",
        phone="5102769900",
        address="26250 Industrial Blvd Suite 103",
        city="Hayward",
        state="CA",
        zip_code="94545",
        website="http://www.pwcba.com/",
        description="Professional Window Cleaning Service Inc. provides premium service to all of its customers, while provided high quality cleaning services at a competitive cost.",
        price="$$$",
        set_hours="yes",
        mon_open="0800",
        mon_close="1700",
        tues_open="0800",
        tues_close="1700",
        wed_open="0800",
        wed_close="1700",
        thu_open="0800",
        thu_close="1700",
        fri_open="0800",
        fri_close="1700",
    )


    bosshogg_industries_demolition_and_removal_services = Company(
        #! id 31
        owner_id=2,
        category_id=8,
        name="BossHogg Industries Demolition & Removal Services",
        phone="8044519724",
        address="1919 Puddledock Rd",
        city="Petersburg",
        state="VA",
        zip_code="23803",
        website="https://bosshoggindustries.com/",
        description="We believe making site preparation, land grading, demolition and excavation as easy as possible for our clients. With this in mind we give you a free upfront estimate, show up at the scheduled time, do the job quickly and professionally and let you get back to more important things as soon as possible.",
        price="$$",
        set_hours="yes",
        mon_open="0700",
        mon_close="1700",
        tues_open="0700",
        tues_close="1700",
        wed_open="0700",
        wed_close="1700",
        thu_open="0700",
        thu_close="1700",
        fri_open="0700",
        fri_close="1700",
        sat_open='0700',
        sat_close='1200',
    )





    db.session.add( all_weather_heating_and_cooling )
    db.session.add( lee_air_conditioning )
    db.session.add( forced_air_mechanical )
    db.session.add( edison_heating_and_cooling )
    db.session.add( hh_heating_air_conditioning_inc )
    db.session.add( commercial_air_refrigeration_and_equipment_services )
    db.session.add( hmd_construction_and_development )
    db.session.add( richard_group )
    db.session.add( munz_construction )
    db.session.add( cali_builders_and_construction_inc )
    db.session.add( cd_electrical_group )
    db.session.add( kb_electric_inc )
    db.session.add( tidal_electrical_services_inc )
    db.session.add( central_florida_electrician )
    db.session.add( ground_source_landscaping )
    db.session.add( palmetto_landscaping_and_design )
    db.session.add( northern_virginia_landscaping )
    db.session.add( castromasonry )
    db.session.add( sams_paving )
    db.session.add( carolina_painting_and_pressure_cleaning_inc )
    db.session.add( painting_contractors_of_md )
    db.session.add( certapro_painters_of_delaware )
    db.session.add( kaufy_painting )
    db.session.add( brown_brothers_plumbing_and_eating )
    db.session.add( atlanta_plumbing_and_drain )
    db.session.add( south_coast_welding_and_manufacturing_llc )
    db.session.add( benavides_welding_works_llc )
    db.session.add( Quality_power_wash_nyc )
    db.session.add( professional_window_cleaning_service_inc )
    db.session.add( bosshogg_industries_demolition_and_removal_services )

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_companies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM companies"))

    db.session.commit()
