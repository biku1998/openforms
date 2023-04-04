import { Meta, StoryObj } from "@storybook/react";
import { Button, buttonVariants } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      type: "string",
      description: "destructive",
    },
    disabled: {
      type: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Hello world",
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: "destructive",
  },
};
