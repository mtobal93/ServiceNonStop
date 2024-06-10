from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import String, Integer, DateTime
from sqlalchemy.sql import func


class Company(db.Model):
    __tablename__ = "companies"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(Integer, primary_key=True)
    owner_id = db.Column(Integer, ForeignKey(add_prefix_for_prod("users.id")))
    category_id = db.Column(Integer, ForeignKey(add_prefix_for_prod("categories.id")))
    name = db.Column(String(255), nullable=False)
    email = db.Column(String(255), nullable=True)
    phone = db.Column(String(10), nullable=True)
    address = db.Column(String(255), nullable=False)
    city = db.Column(String(255), nullable=False)
    state = db.Column(String(2), nullable=False)
    zip_code = db.Column(String(255), nullable=False)
    website = db.Column(String(255), nullable=True)
    description = db.Column(String(255), nullable=False)
    price = db.Column(String(4), nullable=True)
    set_hours = db.Column(String(3), nullable=True)
    mon_open = db.Column(String(4), nullable=True)
    mon_close = db.Column(String(4), nullable=True)
    tues_open = db.Column(String(4), nullable=True)
    tues_close = db.Column(String(4), nullable=True)
    wed_open = db.Column(String(4), nullable=True)
    wed_close = db.Column(String(4), nullable=True)
    thu_open = db.Column(String(4), nullable=True)
    thu_close = db.Column(String(4), nullable=True)
    fri_open = db.Column(String(4), nullable=True)
    fri_close = db.Column(String(4), nullable=True)
    sat_open = db.Column(String(4), nullable=True)
    sat_close = db.Column(String(4), nullable=True)
    sun_open = db.Column(String(4), nullable=True)
    sun_close = db.Column(String(4), nullable=True)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship("User", back_populates="companies")
    category = relationship("Category", back_populates="companies")
    reviews = relationship(
        "Review", back_populates="company", cascade="all, delete-orphan"
    )
    images = db.relationship(
        "Image",
        primaryjoin="and_(Image.imageable_type=='company', foreign(Image.imageable_id)==Company.id)",
        overlaps="images",
        lazy="dynamic",
        cascade="all, delete-orphan",
    )


    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "category_id": self.category_id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "website": self.website,
            "description": self.description,
            "price": self.price,
            "set_hours": self.set_hours,
            "hours": {
                "mon_open": self.mon_open,
                "mon_close": self.mon_close,
                "tues_open": self.tues_open,
                "tues_close": self.tues_close,
                "wed_open": self.wed_open,
                "wed_close": self.wed_close,
                "thu_open": self.thu_open,
                "thu_close": self.thu_close,
                "fri_open": self.fri_open,
                "fri_close": self.fri_close,
                "sat_open": self.sat_open,
                "sat_close": self.sat_close,
                "sun_open": self.sun_open,
                "sun_close": self.sun_close,
            },
        }