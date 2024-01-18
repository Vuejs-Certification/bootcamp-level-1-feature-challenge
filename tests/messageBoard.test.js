import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { beforeAll, describe, expect, it } from "vitest";
import { TransitionGroup } from "vue";

import App from "@/App.vue";
import MessageBoard from "@/components/MessageBoard.vue";
import MessageForm from "@/components/MessageForm.vue";

describe("MessageBoard", () => {
  let wrapper = null;

  beforeAll(() => {
    wrapper = mount(App);
  });

  it("assigns props correctly", async () => {
    const wrapper = mount(MessageBoard, {
      props: {
        messages: [],
      },
    });
    expect(wrapper.props("messages")).toStrictEqual([]);
  });

  it("renders li element with correct data", () => {
    const liElements = wrapper.findAll("li");
    expect(liElements.length).toBe(2);
    expect(liElements.at(0).text()).toContain(
      "Did you hear about Vue 3? It brings enhanced performance and a more streamlined composition API."
    );
    expect(liElements.at(1).text()).toContain(
      "Vue 3 introduces the Composition API, making it easier to organize and reuse code. Exciting times!"
    );
  });

  it("a transition group component is used", async () => {
    const app = mount(App);
    expect(app.findAllComponents(TransitionGroup).length).toBe(1);
  });

  it("a transition group component is used", async () => {
    // mount app with real TransitionGroup
    const app = mount(App, {
      global: { stubs: { "transition-group": false } },
    });

    expect(app.html()).not.toContain("leave-active");

    app.vm.sendMessage({
      author: "John Doe",
      content: "Hello World",
      id: "3",
      timestamp: new Date().toLocaleString(),
    });

    await app.vm.$nextTick();
    expect(app.html()).toContain("enter-active");
  });
});

describe("MessageForm", () => {
  it("Disable the form submit button when the message is empty", async () => {
    const wrapper = mount(MessageForm);
    expect(wrapper.find("button").attributes("disabled")).toBe("");
    wrapper.find("input").setValue("Hello, world!");
    await nextTick();
    expect(wrapper.find("button").attributes("disabled")).toBeUndefined();
  });

  it("Emit a `send-msg` event whenever the form is submitted", async () => {
    const wrapper = mount(MessageForm);
    wrapper.find("input").setValue("Hello, world!");
    wrapper.trigger("submit");
    expect(wrapper.emitted()["send-msg"]).toBeTruthy();
    const emittedParams = wrapper.emitted()["send-msg"][0][0];
    expect(typeof emittedParams.id).toBe("string");
    expect(typeof emittedParams.author).toBe("string");
    expect(typeof emittedParams.timestamp).toBe("string");
    expect(emittedParams.content).toBe("Hello, world!");
  });

  it("Reset the form after submit", async () => {
    const wrapper = mount(MessageForm);
    wrapper.find("input").setValue("Hello, world!");
    wrapper.trigger("submit");
    await nextTick();
    expect(wrapper.find("input").element.value).toBe("");
  });
});
