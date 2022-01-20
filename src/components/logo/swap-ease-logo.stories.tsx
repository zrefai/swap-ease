import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SwapEaseLogo } from "./swap-ease-logo";

export default {
    title: 'Swap Ease Logo',
    component: SwapEaseLogo
} as ComponentMeta<typeof SwapEaseLogo>

const Template: ComponentStory<typeof SwapEaseLogo> = (args) => <SwapEaseLogo {...args}/>

export const Primary = Template.bind({})

export const Secondary = Template.bind({})
Secondary.args = {
    width: '200px',
    height: '80px'
}