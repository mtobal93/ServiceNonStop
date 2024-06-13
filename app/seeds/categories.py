from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():

    #! id=1
    construction = Category(
        name='Construction'
    )

    #! id=2
    electrician = Category(
        name='Electrician'
    )

    #! id=3
    landscaper = Category(
        name='Landscaper'
    )

    #! id-4
    masonry = Category(
        name='Masonry'
    )

    #! id=5
    painter = Category(
        name='Painter'
    )

    #! id=6
    plumber = Category(
        name='Plumber'
    )

    #! id=7
    hvac_refrigeration = Category(
        name='HVAC & Refrigeration'
    )

    #! id=8
    other = Category(
        name='Other'
    )


    db.session.add(construction)
    db.session.add(electrician) 
    db.session.add(landscaper)
    db.session.add(masonry)
    db.session.add(painter)
    db.session.add(plumber)
    db.session.add(hvac_refrigeration)
    db.session.add(other)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
