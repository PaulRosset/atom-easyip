'use babel'

import { CompositeDisposable } from 'atom';
import Easyip from 'easy-ip';
import _string from 'lodash/string'
import _collect from 'lodash/collection'

export default {

  subscriptions: null,

  activate(state) {
    const ip = new Easyip()
    this.subscriptions = new CompositeDisposable();

    this.ipReady = async () => {
      atom.notifications.addInfo("Fetching data ...", {icon: "issue-reopened"})
      const geoIp = await ip.getGeobyMyPubIp()
      const localIp = await ip.getLocalIp()
      const localIPv6 = await ip.getLocalIp("IPv6")
      return { geoIp, localIp, localIPv6 }
    }

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-easyip:launch': async () => {
        const data = await this.ipReady()
        const editor = await atom.workspace.open("atom-easyip.txt")
        atom.notifications.addSuccess("Fetching data succeed about your ip addresses", {icon: "tasklist"})
        this.insert(editor, "### ATOM-EASYIP ###")
        this.insert(editor, "### Public IP/Local IP (IPv4, IPv6) ###")
        _collect.map(data, (value, key) => {
          editor.insertNewline()
          _collect.map(value, (valueIn, keyIn) =>
          this.insert(editor, `${_string.upperFirst(keyIn)}:\t\t${valueIn}`))
        })
      }
    }))
  },

  insert(editor, message) {
    editor.insertText(message)
    editor.insertNewline()
  },

  deactivate() {},

  serialize() {}

};
