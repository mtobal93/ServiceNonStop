from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    
    demo = User(
        #! id=1,
        first_name='Demo',
        last_name='User',
        city='San Francisco',
        state='CA',
        email='demo@aa.io',
        password='password')
    
    marnie = User(
        #! id=2,
        first_name='Marnie',
        last_name='Barnie',
        city='Richmond',
        state='VA',
        email='marnie@aa.io',
        password='password')
    
    bobbie = User(
        #! id=3,
        first_name='Bobbie',
        last_name='Brown',
        city='Miami',
        state='FL',
        email='bobbie@aa.io',
        password='password')
    
    julia = User(
        #! id=4,
        first_name='Julia',
        last_name='Bree',
        city='Columbus',
        state='SC',
        email='julia@aa.io',
        password='password')
    
    june = User(
        #! id=5,
        first_name='June',
        last_name='Stewart',
        city='Hillside',
        state='NJ',
        email='june@aa.io',
        password='password')
    
    august = User(
        #! id=6
        first_name='August',
        last_name='Sheen',
        city='San Francisco',
        state='CA',
        email='august.sheen@aa.io',
        password='password')
    
    robert  = User(
        #! id=7,
        first_name='Robert',
        last_name='Tores',
        city='Norfolk',
        state='VA',
        email='robert.tores@aa.io',
        password='password')
    
    sara = User(
        #! id=8,
        first_name='Sara',
        last_name='Williams',
        city='Dallas',
        state='TX',
        email='sara.williams@aa.io',
        password='password')
    
    teresa = User(
        #! id=9,
        first_name='Teresa',
        last_name='Johnson',
        city='Charlotte',
        state='NC',
        email='teresa.johnson@aa.io',
        password='password')
    
    summer = User(
        #! id=10,
        first_name='Summer',
        last_name='Smith',
        city='Clifton',
        state='NJ',
        email='summer.smith@aa.io',
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(julia)
    db.session.add(june)
    db.session.add(august)
    db.session.add(robert)
    db.session.add(sara)
    db.session.add(teresa)
    db.session.add(summer)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
