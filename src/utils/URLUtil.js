import slugify from 'slugify';
export const convertToSlug = (text) => {
  return slugify(text, {
    replacement: '-',  // replace spaces with -
    remove: /[*+~.()'"!:@]/g, // remove special characters
    lower: true  // convert to lowercase
  });
}