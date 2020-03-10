import * as dotenv from 'dotenv';
import express from 'express';
import api from './api';

dotenv.config();
api(express());
