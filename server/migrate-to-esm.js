#!/usr/bin/env node

/**
 * ES Module Migration Script
 * Converts all CommonJS files to ES modules
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conversions = {
  "const jwt = require('jsonwebtoken');": "import jwt from 'jsonwebtoken';",
  "const bcrypt = require('bcryptjs');": "import bcrypt from 'bcryptjs';",
  "const { PrismaClient } = require('@prisma/client');": "import { PrismaClient } from '@prisma/client';",
  "const express = require('express');": "import express from 'express';",
  "const multer = require('multer');": "import multer from 'multer';",
  "const path = require('path');": "import path from 'path';",
  "const { generateToken } = require('../utils/generateToken');": "import { generateToken } from '../utils/generateToken.js';",
  "const { generateTrackingNumber } = require('../utils/generateTrackingNumber');": "import { generateTrackingNumber } from '../utils/generateTrackingNumber.js';",
  "const { calculateImportCost } = require('../utils/costCalculator');": "import { calculateImportCost } from '../utils/costCalculator.js';",
  "const { protect } = require('../middleware/auth');": "import { protect } from '../middleware/auth.js';",
  "module.exports = {": "export {",
  "module.exports = ": "export default ",
};

console.log('ES Module Migration Script Created');
console.log('This script provides patterns for manual conversion');
console.log('\nKey conversions needed:');
Object.entries(conversions).forEach(([from, to]) => {
  console.log(`  ${from} → ${to}`);
});

export default conversions;
