import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_Api_Version,
  useCdn: false, // Use `false` to avoid cached responses during uploads
});

// Function to upload an image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);

    // Validate if imageUrl is not null or empty
    if (!imageUrl) {
      console.error('Image URL is missing!');
      return null;
    }

    // Fetch the image from the provided URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    console.log('Image fetched successfully:', response.status);

    // Convert the response data to a buffer
    const buffer = Buffer.from(response.data);

    // Upload the image to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', error.message, error.response?.data || '');
    return null;
  }
}

// Function to import data from the external API to Sanity
async function importData() {
  try {
    console.log('Fetching products from API...');

    // Fetch the products from the external API
    const response = await axios.get(
      'https://677d65ed4496848554ca752d.mockapi.io/api/products-data'
    );
    const products = response.data;

    console.log(`Fetched ${products.length} products.`);

    // Iterate over each product and upload it to Sanity
    for (const product of products) {
      console.log(`Processing product: ${product.name}`);

      // Upload the product image to Sanity and get the reference
      let imageRef = null;
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      // Construct the product object with the required fields
      const sanityProduct = {
        _type: 'feature',
        name: product.name,
        description: product.description,
        price: product.price,
        // stock_quantity: product.stock_quantity,
        // discount_percent: product.discount_percent,
        // department:product.department,
        // rating: product.rating,
        // total_orders: product.total_orders,
        // brand: product.brand,
        inventory:product.inventory,
        status:product.status,
        colors: product.colors,
        category: product.category,
        // gender: product.gender,
        size: product.size,
        id: product.id,
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
      };

      console.log('Uploading product to Sanity:', sanityProduct.name);

      // Upload the product to Sanity
      const result = await client.create(sanityProduct);
      console.log(`Product uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error.message, error.response?.data || '');
  }
}

// Run the import data function
importData();
