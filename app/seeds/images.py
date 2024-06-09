from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    all_weather_heating_and_cooling_comp_1 = Image(
        imageable_id=1,
        imageable_type='company',
        url='https://i.imgur.com/9bEZuYg.png',
        uploader_id=1
    )

    all_weather_heating_and_cooling_comp_2 = Image(
        imageable_id=1,
        imageable_type='company',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/aj7a9TE15nvEiKXWfO-UJg/o.jpg',
        uploader_id=9
    )

    all_weather_heating_and_cooling_comp_3 = Image(
        imageable_id=6,
        imageable_type='company',
        url='https://www.smallbusinessbrain.com/wp-content/uploads/2020/04/opening-a-pet-store.jpg',
        uploader_id=7
    )

    all_weather_heating_and_cooling_rev_1 = Image(
        imageable_id=6,
        imageable_type='review',
        url='https://www.smallbusinessbrain.com/wp-content/uploads/2020/04/opening-a-pet-store.jpg',
        uploader_id=3
    )

    db.session.add(all_weather_heating_and_cooling_comp_1)
    db.session.add(all_weather_heating_and_cooling_comp_2)
    db.session.add(all_weather_heating_and_cooling_comp_3)
    db.session.add(all_weather_heating_and_cooling_rev_1)



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