import {
  Prisma,
  ChoiceQuestion as ChoiceQuestionPrisma,
  FileUploadQuestion as FileUploadQuestionPrisma,
  DateQuestion as DateQuestionPrisma,
  NpsQuestion as NpsQuestionPrisma,
  RatingQuestion as RatingQuestionPrisma,
  InfoQuestion as InfoQuestionPrisma,
  TextQuestion as TextQuestionPrisma,
  QuestionType as QuestionTypePrisma,
} from '@prisma/client';

export const QuestionType = {
  CHOICE: QuestionTypePrisma.CHOICE,
  FILE_UPLOAD: QuestionTypePrisma.FILE_UPLOAD,
  DATE: QuestionTypePrisma.DATE,
  INFO: QuestionTypePrisma.INFO,
  RATING: QuestionTypePrisma.RATING,
  NPS: QuestionTypePrisma.NPS,
  TEXT: QuestionTypePrisma.TEXT,
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

type ChoiceQuestionCreateInput = {
  type: typeof QuestionType.CHOICE;
} & Prisma.ChoiceQuestionCreateInput;

type FileUploadQuestionCreateInput = {
  type: typeof QuestionType.FILE_UPLOAD;
} & Prisma.FileUploadQuestionCreateInput;

type DateQuestionCreateInput = {
  type: typeof QuestionType.DATE;
} & Prisma.DateQuestionCreateInput;

type NpsQuestionCreateInput = {
  type: typeof QuestionType.NPS;
} & Prisma.NpsQuestionCreateInput;

type RatingQuestionCreateInput = {
  type: typeof QuestionType.RATING;
} & Prisma.RatingQuestionCreateInput;

type InfoQuestionCreateInput = {
  type: typeof QuestionType.INFO;
} & Prisma.InfoQuestionCreateInput;

type TextQuestionCreateInput = {
  type: typeof QuestionType.TEXT;
} & Prisma.TextQuestionCreateInput;

export type QuestionCreateInput =
  | ChoiceQuestionCreateInput
  | FileUploadQuestionCreateInput
  | DateQuestionCreateInput
  | NpsQuestionCreateInput
  | RatingQuestionCreateInput
  | InfoQuestionCreateInput
  | TextQuestionCreateInput;

type ChoiceQuestion = {
  type: typeof QuestionType.CHOICE;
} & ChoiceQuestionPrisma;

type FileUploadQuestion = {
  type: typeof QuestionType.FILE_UPLOAD;
} & FileUploadQuestionPrisma;

type DateQuestion = {
  type: typeof QuestionType.DATE;
} & DateQuestionPrisma;

type NpsQuestion = {
  type: typeof QuestionType.NPS;
} & NpsQuestionPrisma;

type RatingQuestion = {
  type: typeof QuestionType.RATING;
} & RatingQuestionPrisma;

type InfoQuestion = {
  type: typeof QuestionType.INFO;
} & InfoQuestionPrisma;

type TextQuestion = {
  type: typeof QuestionType.TEXT;
} & TextQuestionPrisma;

export type Question =
  | ChoiceQuestion
  | FileUploadQuestion
  | DateQuestion
  | NpsQuestion
  | RatingQuestion
  | InfoQuestion
  | TextQuestion;

type ChoiceQuestionUpdateInput = {
  type: typeof QuestionType.CHOICE;
} & Prisma.ChoiceQuestionUpdateInput;

type FileUploadQuestionUpdateInput = {
  type: typeof QuestionType.FILE_UPLOAD;
} & Prisma.FileUploadQuestionUpdateInput;

type DateQuestionUpdateInput = {
  type: typeof QuestionType.DATE;
} & Prisma.DateQuestionUpdateInput;

type NpsQuestionUpdateInput = {
  type: typeof QuestionType.NPS;
} & Prisma.NpsQuestionUpdateInput;

type RatingQuestionUpdateInput = {
  type: typeof QuestionType.RATING;
} & Prisma.RatingQuestionUpdateInput;

type InfoQuestionUpdateInput = {
  type: typeof QuestionType.INFO;
} & Prisma.InfoQuestionUpdateInput;

type TextQuestionUpdateInput = {
  type: typeof QuestionType.TEXT;
} & Prisma.TextQuestionUpdateInput;

export type QuestionUpdateInput =
  | ChoiceQuestionUpdateInput
  | FileUploadQuestionUpdateInput
  | DateQuestionUpdateInput
  | NpsQuestionUpdateInput
  | RatingQuestionUpdateInput
  | InfoQuestionUpdateInput
  | TextQuestionUpdateInput;
