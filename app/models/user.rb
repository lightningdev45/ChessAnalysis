class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :annotation_quality_votes
  has_many :taggings
  has_many :relationships,foreign_key: "follower_id",dependent: :destroy
  has_many :followed_users,through: :relationships, :source=> :followed
  has_many :reverse_relationships, foreign_key:"followed_id",class_name:"Relationship",dependent: :destroy
  has_many :followers,through: :reverse_relationships
  has_many :annotations
  has_many :evaluations
  mount_uploader :avatar,UserAvatarUploader
  validates_uniqueness_of :profile_name
  validates_presence_of :profile_name,:email
  acts_as_voter


    def self.full_text_search(query)
      if query.present?
        where("to_tsvector('english',profile_name) @@ :q",q: query)
      else
        nil
      end
    end

  def self.search(search)
    if search.present?
      where('profile_name LIKE ?',"%#{search}%")
    else
      nil
    end
  end
end
