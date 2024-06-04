from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.types import DateTime
from sqlalchemy.sql import func


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    company_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("companies.id"))
    )
    review = db.Column(db.String(1000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    user = db.relationship("User", back_populates="reviews")
    company = db.relationship("Company", back_populates="reviews")
    images = db.relationship(
        "Image",
        primaryjoin="and_(Image.imageable_type=='review', foreign(Image.imageable_id)==Review.id)",
        lazy="dynamic",
        overlaps="company,images,images,review,user",
        cascade="all, delete-orphan",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "company_id": self.company_id,
            "review": self.review,
            "stars": self.stars,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
