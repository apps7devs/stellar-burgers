import PropTypes from 'prop-types';

const itemPropTypes = PropTypes.shape({
  "_id": PropTypes.string.isRequired,
  "name": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired,
  "calories": PropTypes.number.isRequired,
  "carbohydrates": PropTypes.number.isRequired,
  "fat": PropTypes.number.isRequired,
  "image": PropTypes.string.isRequired,
  "image_large": PropTypes.string.isRequired,
  "image_mobile": PropTypes.string.isRequired,
  "price": PropTypes.number.isRequired,
  "proteins": PropTypes.number.isRequired,
  "__v": PropTypes.number.isRequired
});

const ingredientsPropTypes = PropTypes.arrayOf(itemPropTypes).isRequired;

export {
  itemPropTypes,
  ingredientsPropTypes
}