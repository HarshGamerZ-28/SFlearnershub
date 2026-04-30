"""app/models/models.py — SQLAlchemy ORM models"""
import uuid
from datetime import datetime
from typing import List, Optional

from sqlalchemy import (
    Boolean, Column, DateTime, ForeignKey, Integer,
    String, Text, ARRAY, func
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, Mapped, mapped_column

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id            = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email         = Column(String(255), unique=True, nullable=False)
    username      = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name     = Column(String(255))
    avatar_url    = Column(Text)
    role          = Column(String(20), default="reader")
    is_active     = Column(Boolean, default=True)
    created_at    = Column(DateTime(timezone=True), server_default=func.now())
    updated_at    = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    posts         = relationship("Post", back_populates="author")


class Category(Base):
    __tablename__ = "categories"

    id          = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name        = Column(String(255), nullable=False)
    slug        = Column(String(255), unique=True, nullable=False)
    description = Column(Text)
    parent_id   = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=True)
    wp_term_id  = Column(Integer)
    color       = Column(String(7), default="#7C3AED")
    icon        = Column(String(50))
    sort_order  = Column(Integer, default=0)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())

    parent      = relationship("Category", remote_side="Category.id", backref="children")
    posts       = relationship("PostCategory", back_populates="category")


class Tag(Base):
    __tablename__ = "tags"

    id         = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name       = Column(String(100), nullable=False)
    slug       = Column(String(100), unique=True, nullable=False)
    wp_term_id = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    posts      = relationship("PostTag", back_populates="tag")


class Post(Base):
    __tablename__ = "posts"

    id              = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title           = Column(String(500), nullable=False)
    slug            = Column(String(500), unique=True, nullable=False)
    excerpt         = Column(Text)
    content         = Column(Text, nullable=False)
    author_id       = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    youtube_url     = Column(Text)
    reading_time    = Column(Integer)
    difficulty      = Column(String(20), default="beginner")
    featured_image  = Column(Text)
    thumbnail_url   = Column(Text)
    meta_title      = Column(String(255))
    meta_description= Column(String(500))
    meta_keywords   = Column(ARRAY(String))
    canonical_url   = Column(Text)
    og_image        = Column(Text)
    status          = Column(String(20), default="published")
    is_featured     = Column(Boolean, default=False)
    view_count      = Column(Integer, default=0)
    wp_post_id      = Column(Integer)
    wp_guid         = Column(Text)
    migrated_at     = Column(DateTime(timezone=True))
    published_at    = Column(DateTime(timezone=True), server_default=func.now())
    created_at      = Column(DateTime(timezone=True), server_default=func.now())
    updated_at      = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    author      = relationship("User", back_populates="posts")
    categories  = relationship("PostCategory", back_populates="post", cascade="all, delete-orphan")
    tags        = relationship("PostTag", back_populates="post", cascade="all, delete-orphan")


class PostCategory(Base):
    __tablename__ = "post_categories"

    post_id     = Column(UUID(as_uuid=True), ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id", ondelete="CASCADE"), primary_key=True)
    is_primary  = Column(Boolean, default=False)

    post        = relationship("Post", back_populates="categories")
    category    = relationship("Category", back_populates="posts")


class PostTag(Base):
    __tablename__ = "post_tags"

    post_id = Column(UUID(as_uuid=True), ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)
    tag_id  = Column(UUID(as_uuid=True), ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True)

    post = relationship("Post", back_populates="tags")
    tag  = relationship("Tag", back_populates="posts")
