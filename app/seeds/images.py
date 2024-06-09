from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    all_weather_heating_and_cooling_comp_1 = Image(
        imageable_id=1,
        imageable_type='company',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/bDAYEkV-6cOqp1-7FlJvGw/l.jpg',
        uploader_id=1
    )

    all_weather_heating_and_cooling_comp_2 = Image(
        imageable_id=1,
        imageable_type='company',
        url='https://www.bennettac.com/wp-content/uploads/2023/04/commercial.jpg',
        uploader_id=9
    )

    all_weather_heating_and_cooling_comp_3 = Image(
        imageable_id=1,
        imageable_type='company',
        url='https://bordenco.com/wp-content/uploads/natural-gas-burners-400x250.jpg',
        uploader_id=7
    )

    all_weather_heating_and_cooling_rev_1 = Image(
        imageable_id=15,
        imageable_type='review',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/YODOEXJf9m_ZkqANOACydg/o.jpg',
        uploader_id=6
    )

    lee_air_conditioning_comp_1 = Image(
        imageable_id=2,
        imageable_type='company',
        url='https://cdn-spectroline.pressidium.com/wp-content/uploads/2023/02/HVAC-R-Maintenance-Plan-edited.jpg',
        uploader_id=3
    )

    lee_air_conditioning_comp_2 = Image(
        imageable_id=2,
        imageable_type='company',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/T68HExidGsbw4v89p3xkwA/o.jpg',
        uploader_id=9
    )

    lee_air_conditioning_comp_3 = Image(
        imageable_id=2,
        imageable_type='company',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/gs6tMK457yZwbLgRyRiQSQ/o.jpg',
        uploader_id=7
    )

    lee_air_conditioning_rev_1 = Image(
        imageable_id=16,
        imageable_type='review',
        url='https://b2449392.smushcdn.com/2449392/wp-content/uploads/2021/10/hvac-system-inside.jpg?lossy=1&strip=1&webp=1',
        uploader_id=5
    )
    
    forced_air_mechanical_comp_1 = Image(
        imageable_id=3,
        imageable_type='company',
        url='https://scontent-atl3-2.xx.fbcdn.net/v/t1.6435-9/209666898_1119339628552910_5993473342379104980_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=iJcuZKJTyqoQ7kNvgHDTflz&_nc_ht=scontent-atl3-2.xx&oh=00_AYBRxfA5Xc41cJKXPg_sHnTt0DMfAjZpt81FTOw90vlnFg&oe=668D8BA4',
        uploader_id=3
    )

    forced_air_mechanical_comp_2 = Image(
        imageable_id=3,
        imageable_type='company',
        url='https://scontent-atl3-1.xx.fbcdn.net/v/t39.30808-6/274718645_1273014426518762_643297397442131946_n.png?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Avv5HA0MmfcQ7kNvgHoJ4T4&_nc_ht=scontent-atl3-1.xx&oh=00_AYAmcKX61arGgYveUDveA3Iur6_wHCjXIFx4tBOJNB2NZQ&oe=666BD178',
        uploader_id=7
    )

    forced_air_mechanical_rev_1 = Image(
        imageable_id=16,
        imageable_type='review',
        url='https://www.safeatworkca.com/siteassets/images/open-graph/adobestock_178405572-walkinfreezer-og.jpg',
        uploader_id=5
    )

    edison_heating_and_cooling_comp_1 = Image(
        imageable_id=4,
        imageable_type='company',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/YxpCk-eDuK6u8f883dPr1Q/o.jpg',
        uploader_id=2
    )

    edison_heating_and_cooling_comp_2 = Image(
        imageable_id=4,
        imageable_type='company',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/sG1kME8NWQvaU5PwP-6pBw/o.jpg',
        uploader_id=7
    )

    hh_heating_air_conditioning_inc_comp_1 = Image(
        imageable_id=5,
        imageable_type='company',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/QUZeIheBsalPGHkw7awP4w/o.jpg',
        uploader_id=4
    )

    commercial_air_refrigeration_and_equipment_services_comp_1 = Image(
        imageable_id=6,
        imageable_type='company',
        url='https://commairva.com/images/sliderworkcommair2.jpg?crc=326336149',
        uploader_id=6
    )

    commercial_air_refrigeration_and_equipment_services_comp_2 = Image(
        imageable_id=6,
        imageable_type='company',
        url='https://commairva.com/images/sliderworkcommair1.jpg?crc=360484843',
        uploader_id=6
    )

    commercial_air_refrigeration_and_equipment_services_rev_1 = Image(
        imageable_id=16,
        imageable_type='review',
        url='https://www.safeatworkca.com/siteassets/images/open-graph/adobestock_178405572-walkinfreezer-og.jpg',
        uploader_id=5
    )

    hmd_construction_and_development_comp_1 = Image(
        imageable_id=7,
        imageable_type='company',
        url='https://media-content.angi.com/0e9cdc4e-daa5-4974-be03-de381516d3ea.png',
        uploader_id=7
    )

    hmd_construction_and_development_comp_2 = Image(
        imageable_id=7,
        imageable_type='company',
        url='https://www.hmddevelopment.com/site/wp-content/uploads/2023/03/HMD-2-1210x423.jpeg',
        uploader_id=6
    )

    hmd_construction_and_development_rev_1 = Image(
        imageable_id=13,
        imageable_type='review',
        url='https://www.hmddevelopment.com/site/wp-content/uploads/2020/08/Main-Page-Expansion-photo1.jpg',
        uploader_id=10
    )

    richard_group_comp_1 = Image(
        imageable_id=8,
        imageable_type='company',
        url='https://images.squarespace-cdn.com/content/v1/63861dd76334031d32cf1bd0/deedb711-4847-47aa-9761-ae720e2c2d6e/master+logo+on+white.png',
        uploader_id=8
    )

    munz_construction_comp_1 = Image(
        imageable_id=9,
        imageable_type='company',
        url='https://www.munzconstruction.com/wp-content/uploads/2024/01/48892-Munz-Logo-2023.png',
        uploader_id=9
    )
    cali_builders_and_construction_inc_comp_1 = Image(
        imageable_id=10,
        imageable_type='company',
        url='https://lh3.googleusercontent.com/p/AF1QipOhPyyZfANJ8HTahyXSAEb0tLUucmtG-0bihdfl=s1360-w1360-h1020',
        uploader_id=10
    )

    cali_builders_and_construction_inc_rev_1 = Image(
        imageable_id=3,
        imageable_type='review',
        url='https://lh3.googleusercontent.com/p/AF1QipNlrGfAXB4v1UOtxQPIOZh82JYhs11PlnSFno4w=s1360-w1360-h1020',
        uploader_id=10
    )

    cd_electrical_group_comp_1 = Image(
        imageable_id=11,
        imageable_type='company',
        url='https://lh3.googleusercontent.com/p/AF1QipMbfWWxQUkKFruvUpg1W_GR2XfYsR9qWZykg-NQ=s1360-w1360-h1020',
        uploader_id=3
    )

    kb_electric_inc_comp_1 = Image(
        imageable_id=12,
        imageable_type='company',
        url='https://lh3.googleusercontent.com/p/AF1QipMvRG3WsI4_gbGKztqvZYX8rie26KzB-zOM1npi=s1360-w1360-h1020',
        uploader_id=1
    )

    tidal_electrical_services_inc_comp_1 = Image(
        imageable_id=13,
        imageable_type='company',
        url='https://lh3.googleusercontent.com/p/AF1QipNmdKd1xLYFaUPLnKJq_RcxVwvICNLOI3qsye1C=s1360-w1360-h1020',
        uploader_id=7
    )

    central_florida_electrician_comp_1 = Image(
        imageable_id=14,
        imageable_type='company',
        url='https://lh3.googleusercontent.com/p/AF1QipMI_sbbRjCOBFOcNHwLq0jUiY0DEy4zl7qrnB7g=s1360-w1360-h1020',
        uploader_id=1
    )

    ground_source_landscaping_comp_1 = Image(
        imageable_id=15,
        imageable_type='company',
        url='https://envlandscaping.com/wp-content/uploads/2019/05/st-louis-landscaping-curb-appeal.png',
        uploader_id=2
    )
    
    palmetto_landscaping_and_design_comp_1 = Image(
        imageable_id=16,
        imageable_type='company',
        url='https://images.squarespace-cdn.com/content/v1/5ee9e79652a473212a2b37a9/524c2469-e59a-4112-b7d9-c380ca917100/Landscape+Design+Hopkinton+MA.jpeg',
        uploader_id=5
    )

    northern_virginia_landscaping_comp_1 = Image(
        imageable_id=17,
        imageable_type='company',
        url='https://images.squarespace-cdn.com/content/v1/5ec5369b50ea18412f27a032/af02cfd0-1a54-474c-ad5f-a4c5bcf877a5/IMG_9509.JPEG',
        uploader_id=6
    )

    castromasonry_comp_1 = Image(
        imageable_id=18,
        imageable_type='company',
        url='https://www.turnbullmasonry.com/wp-content/uploads/2014/09/Masonry-Work.jpg',
        uploader_id=5
    )

    sams_paving_comp_1 = Image(
        imageable_id=19,
        imageable_type='company',
        url='https://keystonecustomdecks.com/wp-content/uploads/2018/05/masonry-features.jpg',
        uploader_id=6
    )

    carolina_painting_and_pressure_cleaning_incy_comp_1 = Image(
        imageable_id=20,
        imageable_type='company',
        url='https://variset.fi/wp-content/uploads/2020/02/Talon-maalaus-hero-Va%CC%88riset-1366x530px.jpg',
        uploader_id=2
    )

    painting_contractors_of_md_comp_1 = Image(
        imageable_id=21,
        imageable_type='company',
        url='https://www.paintcorps.com/wp-content/uploads/2023/03/benefits-of-interior-painting.jpg',
        uploader_id=3
    )

    certapro_painters_of_delaware_comp_1 = Image(
        imageable_id=20,
        imageable_type='company',
        url='https://variset.fi/wp-content/uploads/2020/02/Talon-maalaus-hero-Va%CC%88riset-1366x530px.jpg',
        uploader_id=2
    )

    certapro_painters_of_delaware_rev_1 = Image(
        imageable_id=21,
        imageable_type='company',
        url='https://www.paintcorps.com/wp-content/uploads/2023/03/benefits-of-interior-painting.jpg',
        uploader_id=3
    )

    kaufy_painting_comp_1 = Image(
        imageable_id=20,
        imageable_type='company',
        url='https://variset.fi/wp-content/uploads/2020/02/Talon-maalaus-hero-Va%CC%88riset-1366x530px.jpg',
        uploader_id=2
    )

    kaufy_painting_rev_1 = Image(
        imageable_id=21,
        imageable_type='company',
        url='https://www.paintcorps.com/wp-content/uploads/2023/03/benefits-of-interior-painting.jpg',
        uploader_id=3
    )

    


    db.session.add(all_weather_heating_and_cooling_comp_1)
    db.session.add(all_weather_heating_and_cooling_comp_2)
    db.session.add(all_weather_heating_and_cooling_comp_3)
    db.session.add(all_weather_heating_and_cooling_rev_1)
    db.session.add(lee_air_conditioning_comp_1)
    db.session.add(lee_air_conditioning_comp_2)
    db.session.add(lee_air_conditioning_comp_3)
    db.session.add(lee_air_conditioning_rev_1)
    db.session.add(forced_air_mechanical_comp_1)
    db.session.add(forced_air_mechanical_comp_2)
    db.session.add(forced_air_mechanical_rev_1)
    db.session.add(edison_heating_and_cooling_comp_1)
    db.session.add(edison_heating_and_cooling_comp_2)
    db.session.add(hh_heating_air_conditioning_inc_comp_1)
    db.session.add(commercial_air_refrigeration_and_equipment_services_comp_1)
    db.session.add(commercial_air_refrigeration_and_equipment_services_comp_2)
    db.session.add(commercial_air_refrigeration_and_equipment_services_rev_1)
    db.session.add(hmd_construction_and_development_comp_1)
    db.session.add(hmd_construction_and_development_comp_2)
    db.session.add(hmd_construction_and_development_rev_1)
    db.session.add(richard_group_comp_1)
    db.session.add(munz_construction_comp_1)
    db.session.add(cali_builders_and_construction_inc_comp_1)
    db.session.add(cali_builders_and_construction_inc_rev_1)
    db.session.add(cd_electrical_group_comp_1)
    db.session.add(kb_electric_inc_comp_1)
    db.session.add(tidal_electrical_services_inc_comp_1)
    db.session.add(central_florida_electrician_comp_1)
    db.session.add(ground_source_landscaping_comp_1)
    db.session.add(palmetto_landscaping_and_design_comp_1)
    db.session.add(northern_virginia_landscaping_comp_1)
    db.session.add(castromasonry_comp_1)
    db.session.add(sams_paving_comp_1)
    db.session.add(carolina_painting_and_pressure_cleaning_incy_comp_1)
    db.session.add(painting_contractors_of_md_comp_1)





    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()