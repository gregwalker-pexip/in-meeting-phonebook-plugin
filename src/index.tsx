import { registerPlugin, ChecklistElement } from "@pexip/plugin-api";

const directoryIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" fill="white"/></svg>';

const directoryHoverIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" fill="black"/></svg>';

const customDirectoryIcon = {
  main: directoryIcon,
  hover: directoryHoverIcon,
};

const roomDirectory = {
  videoRooms: [
    {
      id: "aaaaa@someaddress.com",
      label: "Sydney - Boardroom",
    },
    {
      id: "bbbbb@someaddress.com",
      label: "BrisVegas - Demo Room1",
    },
    {
      id: "ccccc@someaddress.com",
      label: "Melbourne - Meeting Room1",
    },
  ],
};

const pluginName = "in-meeting-phonebook-plugin";

let roomOptions: ChecklistElement["options"];
roomOptions = [
  { id: "0", label: "Public" },
  { id: "1", label: "Private" },
  { id: "2", label: "Confidential" },
];

const plugin = await registerPlugin({
  id: pluginName,
  version: 0,
});

//Some Toast
plugin.ui.showToast({ message: pluginName, isInterrupt: true, timeout: 5000 });

plugin.events.connected.add(() => {
  // On Connect
});

const Button = await plugin.ui
  .addButton({
    position: "toolbar",
    icon: {
      custom: customDirectoryIcon,
    },
    tooltip: "Room Directory",
    roles: ["chair"],
  })
  .catch((e) => {
    console.warn(e);
  });

Button?.onClick.add(async () => {
  const input = await plugin.ui.addForm({
    title: "Video Phonebook",
    description: "Select a (dummy) video system to call.",
    form: {
      elements: {
        directoryList: {
          name: "",
          type: "select",
          options: roomDirectory.videoRooms,
        },
        capabilityList: {
          name: "",
          type: "select",
          options: roomOptions,
        },
      },
      submitBtnTitle: "Call",
    },
  });

  input.onInput.add(async (formInput) => {
    input.remove();

    const selectedRoom = formInput.directoryList;
    if (selectedRoom) {
      const dialout = await plugin.conference.dialOut({
        role: "GUEST",
        destination: selectedRoom,
        protocol: "auto",
      });
      plugin.ui.showToast({
        message: "📞 Calling " + selectedRoom,
        isInterrupt: true,
        timeout: 5000,
      });
    }
  });
});
