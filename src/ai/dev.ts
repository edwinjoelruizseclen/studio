'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/quechua-translation-assistance.ts';
import '@/ai/flows/simple-translator.ts';
