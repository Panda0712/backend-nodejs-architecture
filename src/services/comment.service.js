"use strict";

const Comment = require("../models/comment.model");
const { BadRequestError } = require("../utils/apiError");
const { findProduct } = require("../models/repositories/product.repo");
const { ObjectId } = require("mongodb");

class CommentService {
  static async createComment({ productId, userId, content, parentCommentId }) {
    const comment = new Comment({
      comment_productId: productId,
      comment_userId: userId,
      comment_content: content,
      comment_parentId: parentCommentId,
    });

    let rightValue;
    if (parentCommentId) {
      // reply comment
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment)
        throw new BadRequestError("Parent comment not found!");

      rightValue = parentComment.comment_right;

      await Comment.updateMany(
        {
          comment_productId: new ObjectId(String(productId)),
          comment_right: { $gte: rightValue },
        },
        {
          $inc: { comment_right: 2 },
        }
      );

      await Comment.updateMany(
        {
          comment_productId: new ObjectId(String(productId)),
          comment_left: { $gt: rightValue },
        },
        {
          $inc: { comment_left: 2 },
        }
      );
    } else {
      const maxRightValue = await Comment.findOne(
        {
          comment_productId: new ObjectId(String(productId)),
        },
        "comment_right",
        { sort: { comment_right: -1 } }
      );

      if (maxRightValue) {
        rightValue = maxRightValue.right + 1;
      } else rightValue = 1;
    }

    comment.comment_left = rightValue;
    comment.comment_right = rightValue + 1;

    await comment.save();
    return comment;
  }

  static async getCommentsByParentId({
    productId,
    parentCommentId = null,
    limit = 50,
    offset = 0,
  }) {
    if (parentCommentId) {
      const parent = await Comment.findById(parentCommentId);
      if (!parent) throw new NotFoundError("Not found comment for product!");

      const comments = await Comment.find({
        comment_productId: new ObjectId(String(productId)),
        comment_left: { $gt: parent.comment_left },
        comment_right: { $lte: parent.comment_right },
      })
        .select({
          comment_left: 1,
          comment_right: 1,
          comment_content: 1,
          comment_parentId: 1,
        })
        .sort({
          comment_left: 1,
        });

      return comments;
    }

    const comments = await Comment.find({
      comment_productId: new ObjectId(String(productId)),
      comment_parentId: parentCommentId,
    })
      .select({
        comment_left: 1,
        comment_right: 1,
        comment_content: 1,
        comment_parentId: 1,
      })
      .sort({
        comment_left: 1,
      });

    return comments;
  }

  static async deleteComments({ commentId, productId }) {
    const foundProduct = await findProduct(productId);
    if (!foundProduct) throw new BadRequestError("Product not found!");

    const comment = await Comment.findById(commentId);
    if (!comment) throw new BadRequestError("Comment not found!");

    const leftValue = comment.comment_left;
    const rightValue = comment.comment_right;

    const width = rightValue - leftValue + 1;

    await Comment.deleteMany({
      comment_productId: new ObjectId(String(productId)),
      comment_left: { $gte: leftValue, $lte: rightValue },
    });

    await Comment.updateMany(
      {
        comment_productId: new ObjectId(String(productId)),
        comment_right: { $gt: rightValue },
      },
      {
        $inc: { comment_right: -width },
      }
    );

    await Comment.updateMany(
      {
        comment_productId: new ObjectId(String(productId)),
        comment_left: { $gt: rightValue },
      },
      {
        $inc: { comment_left: -width },
      }
    );

    return true;
  }
}

module.exports = CommentService;
