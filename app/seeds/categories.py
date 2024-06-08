from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text


def seed_categories():
    construction = Category(
        name='Activities'
    )
    electrician = Category(
        name='Restaurants'
        )
    landscaper = Category(
        name='Travel'
    )
    masonry = Category(
        name='Services'
        )
    painter = Category(
        name='Veterinarians'
        )
    plumbing = Category(
        name='Shopping'
        )
    refrigeration = Category(
        name='Adoption'
    )
    more = Category(
        name='Other'
    )


    db.session.add(construction)
    db.session.add(electrician) 
    db.session.add(landscaper)
    db.session.add(masonry)
    db.session.add(painter)
    db.session.add(plumbing)
    db.session.add(refrigeration)
    db.session.add(more)
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
