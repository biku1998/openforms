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
  ChoiceType as ChoiceTypePrisma,
} from '@prisma/client';

export const ChoiceType = {
  RADIO: ChoiceTypePrisma.RADIO,
  DROP_DOWN: ChoiceTypePrisma.DROP_DOWN,
  CHECKBOX: ChoiceTypePrisma.CHECKBOX,
} as const;

export type ChoiceType = (typeof ChoiceType)[keyof typeof ChoiceType];

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
} & Pick<
  Prisma.ChoiceQuestionCreateInput,
  'content' | 'choiceType' | 'shuffleOptions'
>;

type FileUploadQuestionCreateInput = {
  type: typeof QuestionType.FILE_UPLOAD;
} & Pick<
  Prisma.FileUploadQuestionCreateInput,
  'content' | 'maxFileSize' | 'maxFiles' | 'acceptedFileTypes'
>;

type DateQuestionCreateInput = {
  type: typeof QuestionType.DATE;
} & Pick<
  Prisma.DateQuestionCreateInput,
  'content' | 'includeTime' | 'includeYear'
>;

type NpsQuestionCreateInput = {
  type: typeof QuestionType.NPS;
} & Pick<
  Prisma.NpsQuestionCreateInput,
  'content' | 'high' | 'low' | 'highLabel' | 'lowLabel'
>;

type RatingQuestionCreateInput = {
  type: typeof QuestionType.RATING;
} & Pick<
  Prisma.RatingQuestionCreateInput,
  'content' | 'high' | 'low' | 'highLabel' | 'lowLabel' | 'ratingType'
>;

type InfoQuestionCreateInput = {
  type: typeof QuestionType.INFO;
} & Pick<Prisma.InfoQuestionCreateInput, 'content' | 'infoType'>;

type TextQuestionCreateInput = {
  type: typeof QuestionType.TEXT;
} & Pick<Prisma.TextQuestionCreateInput, 'content' | 'paragraph'>;

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
} & Pick<Prisma.ChoiceQuestionUpdateInput, 'content' | 'shuffleOptions'>;

type FileUploadQuestionUpdateInput = {
  type: typeof QuestionType.FILE_UPLOAD;
} & Pick<
  Prisma.FileUploadQuestionUpdateInput,
  'content' | 'maxFileSize' | 'maxFiles' | 'acceptedFileTypes'
>;

type DateQuestionUpdateInput = {
  type: typeof QuestionType.DATE;
} & Pick<
  Prisma.DateQuestionUpdateInput,
  'content' | 'includeTime' | 'includeYear'
>;

type NpsQuestionUpdateInput = {
  type: typeof QuestionType.NPS;
} & Pick<
  Prisma.NpsQuestionUpdateInput,
  'content' | 'high' | 'low' | 'highLabel' | 'lowLabel'
>;

type RatingQuestionUpdateInput = {
  type: typeof QuestionType.RATING;
} & Pick<
  Prisma.RatingQuestionUpdateInput,
  'content' | 'ratingType' | 'high' | 'low' | 'lowLabel' | 'highLabel'
>;

type InfoQuestionUpdateInput = {
  type: typeof QuestionType.INFO;
} & Pick<Prisma.InfoQuestionUpdateInput, 'content' | 'infoType'>;

type TextQuestionUpdateInput = {
  type: typeof QuestionType.TEXT;
} & Pick<Prisma.TextQuestionUpdateInput, 'content' | 'paragraph'>;

export type QuestionUpdateInput =
  | ChoiceQuestionUpdateInput
  | FileUploadQuestionUpdateInput
  | DateQuestionUpdateInput
  | NpsQuestionUpdateInput
  | RatingQuestionUpdateInput
  | InfoQuestionUpdateInput
  | TextQuestionUpdateInput;
