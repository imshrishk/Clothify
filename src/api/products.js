import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../data/db.json');
    const data = JSON.parse(await fs.readFile(filePath, 'utf8'));
    res.status(200).json(data.products);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to load products' });
  }
};