from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    demo_rev_1 = Review(
        #! id 1
        user_id=1,
        business_id=11,
        review='The office was great, but I did not like the technician.',
        stars=3
    )

    demo_rev_2 = Review(
        #! id 2
        user_id=1,
        business_id=6,
        review='I loved how quick they responded. And the technician was very thorough with his diagnostic',
        stars=5
    )

    demo_rev_3 = Review(
        #! id 3
        user_id=1,
        business_id=10,
        review='Service was amazing, I will recommend them 100 times and some',
        stars=5
    )
    
    marnie_rev_1 = Review(
        #! id 4
        user_id=2,
        business_id=7,
        review='Awesome! They put my kitchen together lovely. And the club house for the kids is amazing.',
        stars=5
    )

    marnie_rev_2 = Review(
        #! id 5
        user_id=2,
        business_id=29,
        review='Talk about window cleaning, I thought they took they window off! Now thats clean',
        stars=4
    )

    marnie_rev_3 = Review(
        #! id 6
        user_id=2,
        business_id=16,
        review='Palmetto is where it\'s at!',
        stars=5
    )

    bobbie_rev_1 = Review(
        #! id 7
        user_id=3,
        business_id=8,
        review='We sub contracted them and they did an excellent job. I like working with them',
        stars=5
    )

    bobbie_rev_2 = Review(
        #! id 8
        user_id=3,
        business_id=29,
        review='They are worth the try',
        stars=4
    )

    bobbie_rev_3 = Review(
        #! id 9
        user_id=3,
        business_id=16,
        review='Backyard looks amazing!',
        stars=5
    )

    julia_rev_1 = Review(
        #! id 10
        user_id=4,
        business_id=31,
        review='They spoke it, they broke it, and they cleaned it up!',
        stars=5
    )

    julia_rev_2 = Review(
        #! id 11
        user_id=4,
        business_id=30,
        review='So clean, I feel bad for the birds',
        stars=4
    )

    julia_rev_3 = Review(
        #! id 12
        user_id=4,
        business_id=20,
        review='Service was okay',
        stars=4
    )
    
    summer_rev_1 = Review(
        #! id 13
        user_id=10,
        business_id=7,
        review='Technician was a little weird',
        stars=3
    )

    summer_rev_2 = Review(
        #! id 14
        user_id=10,
        business_id=17,
        review='I love the smell of grass, and love good service!',
        stars=4
    )

    summer_rev_3 = Review(
        #! id 15
        user_id=10,
        business_id=21,
        review='Thank you all for you great work',
        stars=5
    )

    august_rev_1 = Review(
        #! id 13
        user_id=6,
        business_id=28,
        review='I like them and I dont. They have there good days and there bad days',
        stars=3
    )

    august_rev_2 = Review(
        #! id 14
        user_id=6,
        business_id=25,
        review='Service was decent',
        stars=4
    )

    august_rev_3 = Review(
        #! id 15
        user_id=6,
        business_id=1,
        review='They have a good Preventative Maintenance plan',
        stars=4
    )

    db.session.add(demo_rev_1)
    db.session.add(demo_rev_2)
    db.session.add(demo_rev_3)
    db.session.add(marnie_rev_1)
    db.session.add(marnie_rev_2)
    db.session.add(marnie_rev_3)
    db.session.add(bobbie_rev_1)
    db.session.add(bobbie_rev_2)
    db.session.add(bobbie_rev_3)
    db.session.add(julia_rev_1)
    db.session.add(julia_rev_2)
    db.session.add(julia_rev_3)
    db.session.add(summer_rev_1)
    db.session.add(summer_rev_2)
    db.session.add(summer_rev_3)
    db.session.add(august_rev_1)
    db.session.add(august_rev_2)
    db.session.add(august_rev_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
