from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():
    construction = Category(
        #! id=1
        name='Construction'
    )

    electrician = Category(
        #! id=2
        name='Electrician'
    )

    landscaper = Category(
        #! id=3
        name='Landscaper'
    )

    masonry = Category(
        #! id-4
        name='Masonry'
    )

    painter = Category(
        #! id=5
        name='Painter'
    )

    plumber = Category(
        #! id=6
        name='Plumber'
    )

    hvac_refrigeration = Category(
        #! id=7
        name='HVAC & Refrigeration'
    )

    other = Category(
        #! id=8
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
