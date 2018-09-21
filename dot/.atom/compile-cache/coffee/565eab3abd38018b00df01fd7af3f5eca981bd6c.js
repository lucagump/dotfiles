(function() {
  var $, CompositeDisposable, PlatformIOTerminalView, StatusBar, StatusIcon, View, _, os, path, ref,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CompositeDisposable = require('atom').CompositeDisposable;

  ref = require('atom-space-pen-views'), $ = ref.$, View = ref.View;

  PlatformIOTerminalView = require('./view');

  StatusIcon = require('./status-icon');

  os = require('os');

  path = require('path');

  _ = require('underscore');

  module.exports = StatusBar = (function(superClass) {
    extend(StatusBar, superClass);

    function StatusBar() {
      this.moveTerminalView = bind(this.moveTerminalView, this);
      this.onDropTabBar = bind(this.onDropTabBar, this);
      this.onDrop = bind(this.onDrop, this);
      this.onDragOver = bind(this.onDragOver, this);
      this.onDragEnd = bind(this.onDragEnd, this);
      this.onDragLeave = bind(this.onDragLeave, this);
      this.onDragStart = bind(this.onDragStart, this);
      this.closeAll = bind(this.closeAll, this);
      return StatusBar.__super__.constructor.apply(this, arguments);
    }

    StatusBar.prototype.terminalViews = [];

    StatusBar.prototype.activeTerminal = null;

    StatusBar.prototype.returnFocus = null;

    StatusBar.content = function() {
      return this.div({
        "class": 'platformio-ide-terminal status-bar',
        tabindex: -1
      }, (function(_this) {
        return function() {
          _this.i({
            "class": "icon icon-plus",
            click: 'newTerminalView',
            outlet: 'plusBtn'
          });
          _this.ul({
            "class": "list-inline status-container",
            tabindex: '-1',
            outlet: 'statusContainer',
            is: 'space-pen-ul'
          });
          return _this.i({
            "class": "icon icon-x",
            click: 'closeAll',
            outlet: 'closeBtn'
          });
        };
      })(this));
    };

    StatusBar.prototype.initialize = function(statusBarProvider) {
      var handleBlur, handleFocus;
      this.statusBarProvider = statusBarProvider;
      this.subscriptions = new CompositeDisposable();
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'platformio-ide-terminal:focus': (function(_this) {
          return function() {
            return _this.focusTerminal();
          };
        })(this),
        'platformio-ide-terminal:new': (function(_this) {
          return function() {
            return _this.newTerminalView();
          };
        })(this),
        'platformio-ide-terminal:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this),
        'platformio-ide-terminal:next': (function(_this) {
          return function() {
            if (!_this.activeTerminal) {
              return;
            }
            if (_this.activeTerminal.isAnimating()) {
              return;
            }
            if (_this.activeNextTerminalView()) {
              return _this.activeTerminal.open();
            }
          };
        })(this),
        'platformio-ide-terminal:prev': (function(_this) {
          return function() {
            if (!_this.activeTerminal) {
              return;
            }
            if (_this.activeTerminal.isAnimating()) {
              return;
            }
            if (_this.activePrevTerminalView()) {
              return _this.activeTerminal.open();
            }
          };
        })(this),
        'platformio-ide-terminal:clear': (function(_this) {
          return function() {
            return _this.clear();
          };
        })(this),
        'platformio-ide-terminal:close': (function(_this) {
          return function() {
            return _this.destroyActiveTerm();
          };
        })(this),
        'platformio-ide-terminal:close-all': (function(_this) {
          return function() {
            return _this.closeAll();
          };
        })(this),
        'platformio-ide-terminal:rename': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.rename();
            });
          };
        })(this),
        'platformio-ide-terminal:insert-selected-text': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection('$S');
            });
          };
        })(this),
        'platformio-ide-terminal:insert-text': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.inputDialog();
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-1': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText1'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-2': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText2'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-3': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText3'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-4': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText4'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-5': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText5'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-6': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText6'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-7': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText7'));
            });
          };
        })(this),
        'platformio-ide-terminal:insert-custom-text-8': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.insertSelection(atom.config.get('platformio-ide-terminal.customTexts.customText8'));
            });
          };
        })(this),
        'platformio-ide-terminal:fullscreen': (function(_this) {
          return function() {
            return _this.activeTerminal.maximize();
          };
        })(this)
      }));
      this.subscriptions.add(atom.commands.add('.xterm', {
        'platformio-ide-terminal:paste': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.paste();
            });
          };
        })(this),
        'platformio-ide-terminal:copy': (function(_this) {
          return function() {
            return _this.runInActiveView(function(i) {
              return i.copy();
            });
          };
        })(this)
      }));
      this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function(item) {
          var mapping, nextTerminal, prevTerminal;
          if (item == null) {
            return;
          }
          if (item.constructor.name === "PlatformIOTerminalView") {
            return setTimeout(item.focus, 100);
          } else if (item.constructor.name === "TextEditor") {
            mapping = atom.config.get('platformio-ide-terminal.core.mapTerminalsTo');
            if (mapping === 'None') {
              return;
            }
            if (!item.getPath()) {
              return;
            }
            switch (mapping) {
              case 'File':
                nextTerminal = _this.getTerminalById(item.getPath(), function(view) {
                  return view.getId().filePath;
                });
                break;
              case 'Folder':
                nextTerminal = _this.getTerminalById(path.dirname(item.getPath()), function(view) {
                  return view.getId().folderPath;
                });
            }
            prevTerminal = _this.getActiveTerminalView();
            if (prevTerminal !== nextTerminal) {
              if (nextTerminal == null) {
                if (atom.config.get('platformio-ide-terminal.core.mapTerminalsToAutoOpen')) {
                  return nextTerminal = _this.createTerminalView();
                }
              } else {
                _this.setActiveTerminalView(nextTerminal);
                if (prevTerminal != null ? prevTerminal.panel.isVisible() : void 0) {
                  return nextTerminal.toggle();
                }
              }
            }
          }
        };
      })(this)));
      this.registerContextMenu();
      this.subscriptions.add(atom.tooltips.add(this.plusBtn, {
        title: 'New Terminal'
      }));
      this.subscriptions.add(atom.tooltips.add(this.closeBtn, {
        title: 'Close All'
      }));
      this.statusContainer.on('dblclick', (function(_this) {
        return function(event) {
          if (event.target === event.delegateTarget) {
            return _this.newTerminalView();
          }
        };
      })(this));
      this.statusContainer.on('dragstart', '.pio-terminal-status-icon', this.onDragStart);
      this.statusContainer.on('dragend', '.pio-terminal-status-icon', this.onDragEnd);
      this.statusContainer.on('dragleave', this.onDragLeave);
      this.statusContainer.on('dragover', this.onDragOver);
      this.statusContainer.on('drop', this.onDrop);
      handleBlur = (function(_this) {
        return function() {
          var terminal;
          if (terminal = PlatformIOTerminalView.getFocusedTerminal()) {
            _this.returnFocus = _this.terminalViewForTerminal(terminal);
            return terminal.blur();
          }
        };
      })(this);
      handleFocus = (function(_this) {
        return function() {
          if (_this.returnFocus) {
            return setTimeout(function() {
              var ref1;
              if ((ref1 = _this.returnFocus) != null) {
                ref1.focus(true);
              }
              return _this.returnFocus = null;
            }, 100);
          }
        };
      })(this);
      window.addEventListener('blur', handleBlur);
      this.subscriptions.add({
        dispose: function() {
          return window.removeEventListener('blur', handleBlur);
        }
      });
      window.addEventListener('focus', handleFocus);
      this.subscriptions.add({
        dispose: function() {
          return window.removeEventListener('focus', handleFocus);
        }
      });
      return this.attach();
    };

    StatusBar.prototype.registerContextMenu = function() {
      return this.subscriptions.add(atom.commands.add('.platformio-ide-terminal.status-bar', {
        'platformio-ide-terminal:status-red': this.setStatusColor,
        'platformio-ide-terminal:status-orange': this.setStatusColor,
        'platformio-ide-terminal:status-yellow': this.setStatusColor,
        'platformio-ide-terminal:status-green': this.setStatusColor,
        'platformio-ide-terminal:status-blue': this.setStatusColor,
        'platformio-ide-terminal:status-purple': this.setStatusColor,
        'platformio-ide-terminal:status-pink': this.setStatusColor,
        'platformio-ide-terminal:status-cyan': this.setStatusColor,
        'platformio-ide-terminal:status-magenta': this.setStatusColor,
        'platformio-ide-terminal:status-default': this.clearStatusColor,
        'platformio-ide-terminal:context-close': function(event) {
          return $(event.target).closest('.pio-terminal-status-icon')[0].terminalView.destroy();
        },
        'platformio-ide-terminal:context-hide': function(event) {
          var statusIcon;
          statusIcon = $(event.target).closest('.pio-terminal-status-icon')[0];
          if (statusIcon.isActive()) {
            return statusIcon.terminalView.hide();
          }
        },
        'platformio-ide-terminal:context-rename': function(event) {
          return $(event.target).closest('.pio-terminal-status-icon')[0].rename();
        }
      }));
    };

    StatusBar.prototype.registerPaneSubscription = function() {
      return this.subscriptions.add(this.paneSubscription = atom.workspace.observePanes((function(_this) {
        return function(pane) {
          var paneElement, tabBar;
          paneElement = $(atom.views.getView(pane));
          tabBar = paneElement.find('ul');
          tabBar.on('drop', function(event) {
            return _this.onDropTabBar(event, pane);
          });
          tabBar.on('dragstart', function(event) {
            var ref1;
            if (((ref1 = event.target.item) != null ? ref1.constructor.name : void 0) !== 'PlatformIOTerminalView') {
              return;
            }
            return event.originalEvent.dataTransfer.setData('platformio-ide-terminal-tab', 'true');
          });
          return pane.onDidDestroy(function() {
            return tabBar.off('drop', this.onDropTabBar);
          });
        };
      })(this)));
    };

    StatusBar.prototype.createTerminalView = function(autoRun) {
      var args, env, shell, shellArguments, shellEnv;
      shell = atom.config.get('platformio-ide-terminal.core.shell');
      shellArguments = atom.config.get('platformio-ide-terminal.core.shellArguments');
      args = shellArguments.split(/\s+/g).filter(function(arg) {
        return arg;
      });
      shellEnv = atom.config.get('platformio-ide-terminal.core.shellEnv');
      env = {};
      shellEnv.split(' ').forEach((function(_this) {
        return function(element) {
          var configVar, envVar;
          configVar = element.split('=');
          envVar = {};
          envVar[configVar[0]] = configVar[1];
          return env = _.extend(env, envVar);
        };
      })(this));
      return this.createEmptyTerminalView(autoRun, shell, args, env);
    };

    StatusBar.prototype.createEmptyTerminalView = function(autoRun, shell, args, env) {
      var directory, editorFolder, editorPath, home, id, j, len, platformIOTerminalView, projectFolder, pwd, ref1, ref2, statusIcon;
      if (autoRun == null) {
        autoRun = [];
      }
      if (shell == null) {
        shell = null;
      }
      if (args == null) {
        args = [];
      }
      if (env == null) {
        env = {};
      }
      if (this.paneSubscription == null) {
        this.registerPaneSubscription();
      }
      projectFolder = atom.project.getPaths()[0];
      editorPath = (ref1 = atom.workspace.getActiveTextEditor()) != null ? ref1.getPath() : void 0;
      if (editorPath != null) {
        editorFolder = path.dirname(editorPath);
        ref2 = atom.project.getPaths();
        for (j = 0, len = ref2.length; j < len; j++) {
          directory = ref2[j];
          if (editorPath.indexOf(directory) >= 0) {
            projectFolder = directory;
          }
        }
      }
      if ((projectFolder != null ? projectFolder.indexOf('atom://') : void 0) >= 0) {
        projectFolder = void 0;
      }
      home = process.platform === 'win32' ? process.env.HOMEPATH : process.env.HOME;
      switch (atom.config.get('platformio-ide-terminal.core.workingDirectory')) {
        case 'Project':
          pwd = projectFolder || editorFolder || home;
          break;
        case 'Active File':
          pwd = editorFolder || projectFolder || home;
          break;
        default:
          pwd = home;
      }
      id = editorPath || projectFolder || home;
      id = {
        filePath: id,
        folderPath: path.dirname(id)
      };
      statusIcon = new StatusIcon();
      platformIOTerminalView = new PlatformIOTerminalView(id, pwd, statusIcon, this, shell, args, env, autoRun);
      statusIcon.initialize(platformIOTerminalView);
      platformIOTerminalView.attach();
      this.terminalViews.push(platformIOTerminalView);
      this.statusContainer.append(statusIcon);
      return platformIOTerminalView;
    };

    StatusBar.prototype.activeNextTerminalView = function() {
      var index;
      index = this.indexOf(this.activeTerminal);
      if (index < 0) {
        return false;
      }
      return this.activeTerminalView(index + 1);
    };

    StatusBar.prototype.activePrevTerminalView = function() {
      var index;
      index = this.indexOf(this.activeTerminal);
      if (index < 0) {
        return false;
      }
      return this.activeTerminalView(index - 1);
    };

    StatusBar.prototype.indexOf = function(view) {
      return this.terminalViews.indexOf(view);
    };

    StatusBar.prototype.activeTerminalView = function(index) {
      if (this.terminalViews.length < 2) {
        return false;
      }
      if (index >= this.terminalViews.length) {
        index = 0;
      }
      if (index < 0) {
        index = this.terminalViews.length - 1;
      }
      this.activeTerminal = this.terminalViews[index];
      return true;
    };

    StatusBar.prototype.getActiveTerminalView = function() {
      return this.activeTerminal;
    };

    StatusBar.prototype.focusTerminal = function() {
      var terminal;
      if (this.activeTerminal == null) {
        return;
      }
      if (terminal = PlatformIOTerminalView.getFocusedTerminal()) {
        return this.activeTerminal.blur();
      } else {
        return this.activeTerminal.focusTerminal();
      }
    };

    StatusBar.prototype.getTerminalById = function(target, selector) {
      var index, j, ref1, terminal;
      if (selector == null) {
        selector = function(terminal) {
          return terminal.id;
        };
      }
      for (index = j = 0, ref1 = this.terminalViews.length; 0 <= ref1 ? j <= ref1 : j >= ref1; index = 0 <= ref1 ? ++j : --j) {
        terminal = this.terminalViews[index];
        if (terminal != null) {
          if (selector(terminal) === target) {
            return terminal;
          }
        }
      }
      return null;
    };

    StatusBar.prototype.terminalViewForTerminal = function(terminal) {
      var index, j, ref1, terminalView;
      for (index = j = 0, ref1 = this.terminalViews.length; 0 <= ref1 ? j <= ref1 : j >= ref1; index = 0 <= ref1 ? ++j : --j) {
        terminalView = this.terminalViews[index];
        if (terminalView != null) {
          if (terminalView.getTerminal() === terminal) {
            return terminalView;
          }
        }
      }
      return null;
    };

    StatusBar.prototype.runInActiveView = function(callback) {
      var view;
      view = this.getActiveTerminalView();
      if (view != null) {
        return callback(view);
      }
      return null;
    };

    StatusBar.prototype.runNewTerminal = function() {
      this.activeTerminal = this.createEmptyTerminalView();
      this.activeTerminal.toggle();
      return this.activeTerminal;
    };

    StatusBar.prototype.runCommandInNewTerminal = function(commands) {
      this.activeTerminal = this.createTerminalView(commands);
      return this.activeTerminal.toggle();
    };

    StatusBar.prototype.runInOpenView = function(callback) {
      var view;
      view = this.getActiveTerminalView();
      if ((view != null) && view.panel.isVisible()) {
        return callback(view);
      }
      return null;
    };

    StatusBar.prototype.setActiveTerminalView = function(view) {
      return this.activeTerminal = view;
    };

    StatusBar.prototype.removeTerminalView = function(view) {
      var index;
      index = this.indexOf(view);
      if (index < 0) {
        return;
      }
      this.terminalViews.splice(index, 1);
      return this.activateAdjacentTerminal(index);
    };

    StatusBar.prototype.activateAdjacentTerminal = function(index) {
      if (index == null) {
        index = 0;
      }
      if (!(this.terminalViews.length > 0)) {
        return false;
      }
      index = Math.max(0, index - 1);
      this.activeTerminal = this.terminalViews[index];
      return true;
    };

    StatusBar.prototype.newTerminalView = function() {
      var ref1;
      if ((ref1 = this.activeTerminal) != null ? ref1.animating : void 0) {
        return;
      }
      this.activeTerminal = this.createTerminalView();
      return this.activeTerminal.toggle();
    };

    StatusBar.prototype.attach = function() {
      return this.statusBarProvider.addLeftTile({
        item: this,
        priority: -93
      });
    };

    StatusBar.prototype.destroyActiveTerm = function() {
      var index;
      if (this.activeTerminal == null) {
        return;
      }
      index = this.indexOf(this.activeTerminal);
      this.activeTerminal.destroy();
      this.activeTerminal = null;
      return this.activateAdjacentTerminal(index);
    };

    StatusBar.prototype.closeAll = function() {
      var index, j, ref1, view;
      for (index = j = ref1 = this.terminalViews.length; ref1 <= 0 ? j <= 0 : j >= 0; index = ref1 <= 0 ? ++j : --j) {
        view = this.terminalViews[index];
        if (view != null) {
          view.destroy();
        }
      }
      return this.activeTerminal = null;
    };

    StatusBar.prototype.destroy = function() {
      var j, len, ref1, view;
      this.subscriptions.dispose();
      ref1 = this.terminalViews;
      for (j = 0, len = ref1.length; j < len; j++) {
        view = ref1[j];
        view.ptyProcess.terminate();
        view.terminal.destroy();
      }
      return this.detach();
    };

    StatusBar.prototype.toggle = function() {
      if (this.terminalViews.length === 0) {
        this.activeTerminal = this.createTerminalView();
      } else if (this.activeTerminal === null) {
        this.activeTerminal = this.terminalViews[0];
      }
      return this.activeTerminal.toggle();
    };

    StatusBar.prototype.clear = function() {
      this.destroyActiveTerm();
      return this.newTerminalView();
    };

    StatusBar.prototype.setStatusColor = function(event) {
      var color;
      color = event.type.match(/\w+$/)[0];
      color = atom.config.get("platformio-ide-terminal.iconColors." + color).toRGBAString();
      return $(event.target).closest('.pio-terminal-status-icon').css('color', color);
    };

    StatusBar.prototype.clearStatusColor = function(event) {
      return $(event.target).closest('.pio-terminal-status-icon').css('color', '');
    };

    StatusBar.prototype.onDragStart = function(event) {
      var element;
      event.originalEvent.dataTransfer.setData('platformio-ide-terminal-panel', 'true');
      element = $(event.target).closest('.pio-terminal-status-icon');
      element.addClass('is-dragging');
      return event.originalEvent.dataTransfer.setData('from-index', element.index());
    };

    StatusBar.prototype.onDragLeave = function(event) {
      return this.removePlaceholder();
    };

    StatusBar.prototype.onDragEnd = function(event) {
      return this.clearDropTarget();
    };

    StatusBar.prototype.onDragOver = function(event) {
      var element, newDropTargetIndex, statusIcons;
      event.preventDefault();
      event.stopPropagation();
      if (event.originalEvent.dataTransfer.getData('platformio-ide-terminal') !== 'true') {
        return;
      }
      newDropTargetIndex = this.getDropTargetIndex(event);
      if (newDropTargetIndex == null) {
        return;
      }
      this.removeDropTargetClasses();
      statusIcons = this.statusContainer.children('.pio-terminal-status-icon');
      if (newDropTargetIndex < statusIcons.length) {
        element = statusIcons.eq(newDropTargetIndex).addClass('is-drop-target');
        return this.getPlaceholder().insertBefore(element);
      } else {
        element = statusIcons.eq(newDropTargetIndex - 1).addClass('drop-target-is-after');
        return this.getPlaceholder().insertAfter(element);
      }
    };

    StatusBar.prototype.onDrop = function(event) {
      var dataTransfer, fromIndex, pane, paneIndex, panelEvent, tabEvent, toIndex, view;
      dataTransfer = event.originalEvent.dataTransfer;
      panelEvent = dataTransfer.getData('platformio-ide-terminal-panel') === 'true';
      tabEvent = dataTransfer.getData('platformio-ide-terminal-tab') === 'true';
      if (!(panelEvent || tabEvent)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      toIndex = this.getDropTargetIndex(event);
      this.clearDropTarget();
      if (tabEvent) {
        fromIndex = parseInt(dataTransfer.getData('sortable-index'));
        paneIndex = parseInt(dataTransfer.getData('from-pane-index'));
        pane = atom.workspace.getPanes()[paneIndex];
        view = pane.itemAtIndex(fromIndex);
        pane.removeItem(view, false);
        view.show();
        view.toggleTabView();
        this.terminalViews.push(view);
        if (view.statusIcon.isActive()) {
          view.open();
        }
        this.statusContainer.append(view.statusIcon);
        fromIndex = this.terminalViews.length - 1;
      } else {
        fromIndex = parseInt(dataTransfer.getData('from-index'));
      }
      return this.updateOrder(fromIndex, toIndex);
    };

    StatusBar.prototype.onDropTabBar = function(event, pane) {
      var dataTransfer, fromIndex, tabBar, view;
      dataTransfer = event.originalEvent.dataTransfer;
      if (dataTransfer.getData('platformio-ide-terminal-panel') !== 'true') {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      this.clearDropTarget();
      fromIndex = parseInt(dataTransfer.getData('from-index'));
      view = this.terminalViews[fromIndex];
      view.css("height", "");
      view.terminal.element.style.height = "";
      tabBar = $(event.target).closest('.tab-bar');
      view.toggleTabView();
      this.removeTerminalView(view);
      this.statusContainer.children().eq(fromIndex).detach();
      view.statusIcon.removeTooltip();
      pane.addItem(view, pane.getItems().length);
      pane.activateItem(view);
      return view.focus();
    };

    StatusBar.prototype.clearDropTarget = function() {
      var element;
      element = this.find('.is-dragging');
      element.removeClass('is-dragging');
      this.removeDropTargetClasses();
      return this.removePlaceholder();
    };

    StatusBar.prototype.removeDropTargetClasses = function() {
      this.statusContainer.find('.is-drop-target').removeClass('is-drop-target');
      return this.statusContainer.find('.drop-target-is-after').removeClass('drop-target-is-after');
    };

    StatusBar.prototype.getDropTargetIndex = function(event) {
      var element, elementCenter, statusIcons, target;
      target = $(event.target);
      if (this.isPlaceholder(target)) {
        return;
      }
      statusIcons = this.statusContainer.children('.pio-terminal-status-icon');
      element = target.closest('.pio-terminal-status-icon');
      if (element.length === 0) {
        element = statusIcons.last();
      }
      if (!element.length) {
        return 0;
      }
      elementCenter = element.offset().left + element.width() / 2;
      if (event.originalEvent.pageX < elementCenter) {
        return statusIcons.index(element);
      } else if (element.next('.pio-terminal-status-icon').length > 0) {
        return statusIcons.index(element.next('.pio-terminal-status-icon'));
      } else {
        return statusIcons.index(element) + 1;
      }
    };

    StatusBar.prototype.getPlaceholder = function() {
      return this.placeholderEl != null ? this.placeholderEl : this.placeholderEl = $('<li class="placeholder"></li>');
    };

    StatusBar.prototype.removePlaceholder = function() {
      var ref1;
      if ((ref1 = this.placeholderEl) != null) {
        ref1.remove();
      }
      return this.placeholderEl = null;
    };

    StatusBar.prototype.isPlaceholder = function(element) {
      return element.is('.placeholder');
    };

    StatusBar.prototype.iconAtIndex = function(index) {
      return this.getStatusIcons().eq(index);
    };

    StatusBar.prototype.getStatusIcons = function() {
      return this.statusContainer.children('.pio-terminal-status-icon');
    };

    StatusBar.prototype.moveIconToIndex = function(icon, toIndex) {
      var container, followingIcon;
      followingIcon = this.getStatusIcons()[toIndex];
      container = this.statusContainer[0];
      if (followingIcon != null) {
        return container.insertBefore(icon, followingIcon);
      } else {
        return container.appendChild(icon);
      }
    };

    StatusBar.prototype.moveTerminalView = function(fromIndex, toIndex) {
      var activeTerminal, view;
      activeTerminal = this.getActiveTerminalView();
      view = this.terminalViews.splice(fromIndex, 1)[0];
      this.terminalViews.splice(toIndex, 0, view);
      return this.setActiveTerminalView(activeTerminal);
    };

    StatusBar.prototype.updateOrder = function(fromIndex, toIndex) {
      var icon;
      if (fromIndex === toIndex) {
        return;
      }
      if (fromIndex < toIndex) {
        toIndex--;
      }
      icon = this.getStatusIcons().eq(fromIndex).detach();
      this.moveIconToIndex(icon.get(0), toIndex);
      this.moveTerminalView(fromIndex, toIndex);
      icon.addClass('inserted');
      return icon.one('webkitAnimationEnd', function() {
        return icon.removeClass('inserted');
      });
    };

    return StatusBar;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvbHVjYW1hcnRpbmVsbGkvLmF0b20vcGFja2FnZXMvcGxhdGZvcm1pby1pZGUtdGVybWluYWwvbGliL3N0YXR1cy1iYXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQSw2RkFBQTtJQUFBOzs7O0VBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSOztFQUN4QixNQUFZLE9BQUEsQ0FBUSxzQkFBUixDQUFaLEVBQUMsU0FBRCxFQUFJOztFQUVKLHNCQUFBLEdBQXlCLE9BQUEsQ0FBUSxRQUFSOztFQUN6QixVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVI7O0VBRWIsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztFQUNMLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUjs7RUFDUCxDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVI7O0VBRUosTUFBTSxDQUFDLE9BQVAsR0FDTTs7Ozs7Ozs7Ozs7Ozs7O3dCQUNKLGFBQUEsR0FBZTs7d0JBQ2YsY0FBQSxHQUFnQjs7d0JBQ2hCLFdBQUEsR0FBYTs7SUFFYixTQUFDLENBQUEsT0FBRCxHQUFVLFNBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO1FBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyxvQ0FBUDtRQUE2QyxRQUFBLEVBQVUsQ0FBQyxDQUF4RDtPQUFMLEVBQWdFLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQTtVQUM5RCxLQUFDLENBQUEsQ0FBRCxDQUFHO1lBQUEsQ0FBQSxLQUFBLENBQUEsRUFBTyxnQkFBUDtZQUF5QixLQUFBLEVBQU8saUJBQWhDO1lBQW1ELE1BQUEsRUFBUSxTQUEzRDtXQUFIO1VBQ0EsS0FBQyxDQUFBLEVBQUQsQ0FBSTtZQUFBLENBQUEsS0FBQSxDQUFBLEVBQU8sOEJBQVA7WUFBdUMsUUFBQSxFQUFVLElBQWpEO1lBQXVELE1BQUEsRUFBUSxpQkFBL0Q7WUFBa0YsRUFBQSxFQUFJLGNBQXRGO1dBQUo7aUJB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SSxDQUFDLFFBQUwsQ0FBYyxVQUFkO2FBQ0EsSUFBSSxDQUFDLEdBQUwsQ0FBUyxvQkFBVCxFQUErQixTQUFBO2VBQUcsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsVUFBakI7TUFBSCxDQUEvQjtJQVJXOzs7O0tBeGRTO0FBWHhCIiwic291cmNlc0NvbnRlbnQiOlsie0NvbXBvc2l0ZURpc3Bvc2FibGV9ID0gcmVxdWlyZSAnYXRvbSdcbnskLCBWaWV3fSA9IHJlcXVpcmUgJ2F0b20tc3BhY2UtcGVuLXZpZXdzJ1xuXG5QbGF0Zm9ybUlPVGVybWluYWxWaWV3ID0gcmVxdWlyZSAnLi92aWV3J1xuU3RhdHVzSWNvbiA9IHJlcXVpcmUgJy4vc3RhdHVzLWljb24nXG5cbm9zID0gcmVxdWlyZSAnb3MnXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbl8gPSByZXF1aXJlICd1bmRlcnNjb3JlJ1xuXG5tb2R1bGUuZXhwb3J0cyA9XG5jbGFzcyBTdGF0dXNCYXIgZXh0ZW5kcyBWaWV3XG4gIHRlcm1pbmFsVmlld3M6IFtdXG4gIGFjdGl2ZVRlcm1pbmFsOiBudWxsXG4gIHJldHVybkZvY3VzOiBudWxsXG5cbiAgQGNvbnRlbnQ6IC0+XG4gICAgQGRpdiBjbGFzczogJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsIHN0YXR1cy1iYXInLCB0YWJpbmRleDogLTEsID0+XG4gICAgICBAaSBjbGFzczogXCJpY29uIGljb24tcGx1c1wiLCBjbGljazogJ25ld1Rlcm1pbmFsVmlldycsIG91dGxldDogJ3BsdXNCdG4nXG4gICAgICBAdWwgY2xhc3M6IFwibGlzdC1pbmxpbmUgc3RhdHVzLWNvbnRhaW5lclwiLCB0YWJpbmRleDogJy0xJywgb3V0bGV0OiAnc3RhdHVzQ29udGFpbmVyJywgaXM6ICdzcGFjZS1wZW4tdWwnXG4gICAgICBAaSBjbGFzczogXCJpY29uIGljb24teFwiLCBjbGljazogJ2Nsb3NlQWxsJywgb3V0bGV0OiAnY2xvc2VCdG4nXG5cbiAgaW5pdGlhbGl6ZTogKEBzdGF0dXNCYXJQcm92aWRlcikgLT5cbiAgICBAc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbW1hbmRzLmFkZCAnYXRvbS13b3Jrc3BhY2UnLFxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmZvY3VzJzogPT4gQGZvY3VzVGVybWluYWwoKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOm5ldyc6ID0+IEBuZXdUZXJtaW5hbFZpZXcoKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnRvZ2dsZSc6ID0+IEB0b2dnbGUoKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOm5leHQnOiA9PlxuICAgICAgICByZXR1cm4gdW5sZXNzIEBhY3RpdmVUZXJtaW5hbFxuICAgICAgICByZXR1cm4gaWYgQGFjdGl2ZVRlcm1pbmFsLmlzQW5pbWF0aW5nKClcbiAgICAgICAgQGFjdGl2ZVRlcm1pbmFsLm9wZW4oKSBpZiBAYWN0aXZlTmV4dFRlcm1pbmFsVmlldygpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6cHJldic6ID0+XG4gICAgICAgIHJldHVybiB1bmxlc3MgQGFjdGl2ZVRlcm1pbmFsXG4gICAgICAgIHJldHVybiBpZiBAYWN0aXZlVGVybWluYWwuaXNBbmltYXRpbmcoKVxuICAgICAgICBAYWN0aXZlVGVybWluYWwub3BlbigpIGlmIEBhY3RpdmVQcmV2VGVybWluYWxWaWV3KClcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpjbGVhcic6ID0+IEBjbGVhcigpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6Y2xvc2UnOiA9PiBAZGVzdHJveUFjdGl2ZVRlcm0oKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmNsb3NlLWFsbCc6ID0+IEBjbG9zZUFsbCgpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6cmVuYW1lJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5yZW5hbWUoKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1zZWxlY3RlZC10ZXh0JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oJyRTJylcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtdGV4dCc6ID0+IEBydW5JbkFjdGl2ZVZpZXcgKGkpIC0+IGkuaW5wdXREaWFsb2coKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC0xJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0MScpKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC0yJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0MicpKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC0zJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0MycpKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC00JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0NCcpKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC01JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0NScpKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC02JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0NicpKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC03JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0NycpKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC04JzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5pbnNlcnRTZWxlY3Rpb24oYXRvbS5jb25maWcuZ2V0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jdXN0b21UZXh0cy5jdXN0b21UZXh0OCcpKVxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmZ1bGxzY3JlZW4nOiA9PiBAYWN0aXZlVGVybWluYWwubWF4aW1pemUoKVxuXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20uY29tbWFuZHMuYWRkICcueHRlcm0nLFxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnBhc3RlJzogPT4gQHJ1bkluQWN0aXZlVmlldyAoaSkgLT4gaS5wYXN0ZSgpXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6Y29weSc6ID0+IEBydW5JbkFjdGl2ZVZpZXcgKGkpIC0+IGkuY29weSgpXG5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgYXRvbS53b3Jrc3BhY2Uub25EaWRDaGFuZ2VBY3RpdmVQYW5lSXRlbSAoaXRlbSkgPT5cbiAgICAgIHJldHVybiB1bmxlc3MgaXRlbT9cblxuICAgICAgaWYgaXRlbS5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiUGxhdGZvcm1JT1Rlcm1pbmFsVmlld1wiXG4gICAgICAgIHNldFRpbWVvdXQgaXRlbS5mb2N1cywgMTAwXG4gICAgICBlbHNlIGlmIGl0ZW0uY29uc3RydWN0b3IubmFtZSBpcyBcIlRleHRFZGl0b3JcIlxuICAgICAgICBtYXBwaW5nID0gYXRvbS5jb25maWcuZ2V0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5jb3JlLm1hcFRlcm1pbmFsc1RvJylcbiAgICAgICAgcmV0dXJuIGlmIG1hcHBpbmcgaXMgJ05vbmUnXG4gICAgICAgIHJldHVybiB1bmxlc3MgaXRlbS5nZXRQYXRoKClcblxuICAgICAgICBzd2l0Y2ggbWFwcGluZ1xuICAgICAgICAgIHdoZW4gJ0ZpbGUnXG4gICAgICAgICAgICBuZXh0VGVybWluYWwgPSBAZ2V0VGVybWluYWxCeUlkIGl0ZW0uZ2V0UGF0aCgpLCAodmlldykgLT4gdmlldy5nZXRJZCgpLmZpbGVQYXRoXG4gICAgICAgICAgd2hlbiAnRm9sZGVyJ1xuICAgICAgICAgICAgbmV4dFRlcm1pbmFsID0gQGdldFRlcm1pbmFsQnlJZCBwYXRoLmRpcm5hbWUoaXRlbS5nZXRQYXRoKCkpLCAodmlldykgLT4gdmlldy5nZXRJZCgpLmZvbGRlclBhdGhcblxuICAgICAgICBwcmV2VGVybWluYWwgPSBAZ2V0QWN0aXZlVGVybWluYWxWaWV3KClcbiAgICAgICAgaWYgcHJldlRlcm1pbmFsICE9IG5leHRUZXJtaW5hbFxuICAgICAgICAgIGlmIG5vdCBuZXh0VGVybWluYWw/XG4gICAgICAgICAgICBpZiBhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmNvcmUubWFwVGVybWluYWxzVG9BdXRvT3BlbicpXG4gICAgICAgICAgICAgIG5leHRUZXJtaW5hbCA9IEBjcmVhdGVUZXJtaW5hbFZpZXcoKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIEBzZXRBY3RpdmVUZXJtaW5hbFZpZXcobmV4dFRlcm1pbmFsKVxuICAgICAgICAgICAgbmV4dFRlcm1pbmFsLnRvZ2dsZSgpIGlmIHByZXZUZXJtaW5hbD8ucGFuZWwuaXNWaXNpYmxlKClcblxuICAgIEByZWdpc3RlckNvbnRleHRNZW51KClcblxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLnRvb2x0aXBzLmFkZCBAcGx1c0J0biwgdGl0bGU6ICdOZXcgVGVybWluYWwnXG4gICAgQHN1YnNjcmlwdGlvbnMuYWRkIGF0b20udG9vbHRpcHMuYWRkIEBjbG9zZUJ0biwgdGl0bGU6ICdDbG9zZSBBbGwnXG5cbiAgICBAc3RhdHVzQ29udGFpbmVyLm9uICdkYmxjbGljaycsIChldmVudCkgPT5cbiAgICAgIEBuZXdUZXJtaW5hbFZpZXcoKSB1bmxlc3MgZXZlbnQudGFyZ2V0ICE9IGV2ZW50LmRlbGVnYXRlVGFyZ2V0XG5cbiAgICBAc3RhdHVzQ29udGFpbmVyLm9uICdkcmFnc3RhcnQnLCAnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicsIEBvbkRyYWdTdGFydFxuICAgIEBzdGF0dXNDb250YWluZXIub24gJ2RyYWdlbmQnLCAnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicsIEBvbkRyYWdFbmRcbiAgICBAc3RhdHVzQ29udGFpbmVyLm9uICdkcmFnbGVhdmUnLCBAb25EcmFnTGVhdmVcbiAgICBAc3RhdHVzQ29udGFpbmVyLm9uICdkcmFnb3ZlcicsIEBvbkRyYWdPdmVyXG4gICAgQHN0YXR1c0NvbnRhaW5lci5vbiAnZHJvcCcsIEBvbkRyb3BcblxuICAgIGhhbmRsZUJsdXIgPSA9PlxuICAgICAgaWYgdGVybWluYWwgPSBQbGF0Zm9ybUlPVGVybWluYWxWaWV3LmdldEZvY3VzZWRUZXJtaW5hbCgpXG4gICAgICAgIEByZXR1cm5Gb2N1cyA9IEB0ZXJtaW5hbFZpZXdGb3JUZXJtaW5hbCh0ZXJtaW5hbClcbiAgICAgICAgdGVybWluYWwuYmx1cigpXG5cbiAgICBoYW5kbGVGb2N1cyA9ID0+XG4gICAgICBpZiBAcmV0dXJuRm9jdXNcbiAgICAgICAgc2V0VGltZW91dCA9PlxuICAgICAgICAgIEByZXR1cm5Gb2N1cz8uZm9jdXModHJ1ZSlcbiAgICAgICAgICBAcmV0dXJuRm9jdXMgPSBudWxsXG4gICAgICAgICwgMTAwXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAnYmx1cicsIGhhbmRsZUJsdXJcbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgZGlzcG9zZTogLT5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyICdibHVyJywgaGFuZGxlQmx1clxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgJ2ZvY3VzJywgaGFuZGxlRm9jdXNcbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgZGlzcG9zZTogLT5cbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyICdmb2N1cycsIGhhbmRsZUZvY3VzXG5cbiAgICBAYXR0YWNoKClcblxuICByZWdpc3RlckNvbnRleHRNZW51OiAtPlxuICAgIEBzdWJzY3JpcHRpb25zLmFkZCBhdG9tLmNvbW1hbmRzLmFkZCAnLnBsYXRmb3JtaW8taWRlLXRlcm1pbmFsLnN0YXR1cy1iYXInLFxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnN0YXR1cy1yZWQnOiBAc2V0U3RhdHVzQ29sb3JcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpzdGF0dXMtb3JhbmdlJzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6c3RhdHVzLXllbGxvdyc6IEBzZXRTdGF0dXNDb2xvclxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnN0YXR1cy1ncmVlbic6IEBzZXRTdGF0dXNDb2xvclxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnN0YXR1cy1ibHVlJzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6c3RhdHVzLXB1cnBsZSc6IEBzZXRTdGF0dXNDb2xvclxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnN0YXR1cy1waW5rJzogQHNldFN0YXR1c0NvbG9yXG4gICAgICAncGxhdGZvcm1pby1pZGUtdGVybWluYWw6c3RhdHVzLWN5YW4nOiBAc2V0U3RhdHVzQ29sb3JcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpzdGF0dXMtbWFnZW50YSc6IEBzZXRTdGF0dXNDb2xvclxuICAgICAgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnN0YXR1cy1kZWZhdWx0JzogQGNsZWFyU3RhdHVzQ29sb3JcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpjb250ZXh0LWNsb3NlJzogKGV2ZW50KSAtPlxuICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpWzBdLnRlcm1pbmFsVmlldy5kZXN0cm95KClcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpjb250ZXh0LWhpZGUnOiAoZXZlbnQpIC0+XG4gICAgICAgIHN0YXR1c0ljb24gPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpWzBdXG4gICAgICAgIHN0YXR1c0ljb24udGVybWluYWxWaWV3LmhpZGUoKSBpZiBzdGF0dXNJY29uLmlzQWN0aXZlKClcbiAgICAgICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpjb250ZXh0LXJlbmFtZSc6IChldmVudCkgLT5cbiAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5waW8tdGVybWluYWwtc3RhdHVzLWljb24nKVswXS5yZW5hbWUoKVxuXG4gIHJlZ2lzdGVyUGFuZVN1YnNjcmlwdGlvbjogLT5cbiAgICBAc3Vic2NyaXB0aW9ucy5hZGQgQHBhbmVTdWJzY3JpcHRpb24gPSBhdG9tLndvcmtzcGFjZS5vYnNlcnZlUGFuZXMgKHBhbmUpID0+XG4gICAgICBwYW5lRWxlbWVudCA9ICQoYXRvbS52aWV3cy5nZXRWaWV3KHBhbmUpKVxuICAgICAgdGFiQmFyID0gcGFuZUVsZW1lbnQuZmluZCgndWwnKVxuXG4gICAgICB0YWJCYXIub24gJ2Ryb3AnLCAoZXZlbnQpID0+IEBvbkRyb3BUYWJCYXIoZXZlbnQsIHBhbmUpXG4gICAgICB0YWJCYXIub24gJ2RyYWdzdGFydCcsIChldmVudCkgLT5cbiAgICAgICAgcmV0dXJuIHVubGVzcyBldmVudC50YXJnZXQuaXRlbT8uY29uc3RydWN0b3IubmFtZSBpcyAnUGxhdGZvcm1JT1Rlcm1pbmFsVmlldydcbiAgICAgICAgZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSAncGxhdGZvcm1pby1pZGUtdGVybWluYWwtdGFiJywgJ3RydWUnXG4gICAgICBwYW5lLm9uRGlkRGVzdHJveSAtPiB0YWJCYXIub2ZmICdkcm9wJywgQG9uRHJvcFRhYkJhclxuXG4gIGNyZWF0ZVRlcm1pbmFsVmlldzogKGF1dG9SdW4pIC0+XG4gICAgc2hlbGwgPSBhdG9tLmNvbmZpZy5nZXQgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmNvcmUuc2hlbGwnXG4gICAgc2hlbGxBcmd1bWVudHMgPSBhdG9tLmNvbmZpZy5nZXQgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmNvcmUuc2hlbGxBcmd1bWVudHMnXG4gICAgYXJncyA9IHNoZWxsQXJndW1lbnRzLnNwbGl0KC9cXHMrL2cpLmZpbHRlciAoYXJnKSAtPiBhcmdcbiAgICBzaGVsbEVudiA9IGF0b20uY29uZmlnLmdldCAncGxhdGZvcm1pby1pZGUtdGVybWluYWwuY29yZS5zaGVsbEVudidcbiAgICBlbnYgPSB7fVxuICAgIHNoZWxsRW52LnNwbGl0KCcgJykuZm9yRWFjaCgoZWxlbWVudCkgPT5cbiAgICAgIGNvbmZpZ1ZhciA9IGVsZW1lbnQuc3BsaXQoJz0nKVxuICAgICAgZW52VmFyID0ge31cbiAgICAgIGVudlZhcltjb25maWdWYXJbMF1dID0gY29uZmlnVmFyWzFdXG4gICAgICBlbnYgPSBfLmV4dGVuZChlbnYsIGVudlZhcilcbiAgICApXG4gICAgQGNyZWF0ZUVtcHR5VGVybWluYWxWaWV3IGF1dG9SdW4sIHNoZWxsLCBhcmdzLCBlbnZcblxuICBjcmVhdGVFbXB0eVRlcm1pbmFsVmlldzogKGF1dG9SdW49W10sIHNoZWxsID0gbnVsbCwgYXJncyA9IFtdLCBlbnY9IHt9KSAtPlxuICAgIEByZWdpc3RlclBhbmVTdWJzY3JpcHRpb24oKSB1bmxlc3MgQHBhbmVTdWJzY3JpcHRpb24/XG5cbiAgICBwcm9qZWN0Rm9sZGVyID0gYXRvbS5wcm9qZWN0LmdldFBhdGhzKClbMF1cbiAgICBlZGl0b3JQYXRoID0gYXRvbS53b3Jrc3BhY2UuZ2V0QWN0aXZlVGV4dEVkaXRvcigpPy5nZXRQYXRoKClcblxuICAgIGlmIGVkaXRvclBhdGg/XG4gICAgICBlZGl0b3JGb2xkZXIgPSBwYXRoLmRpcm5hbWUoZWRpdG9yUGF0aClcbiAgICAgIGZvciBkaXJlY3RvcnkgaW4gYXRvbS5wcm9qZWN0LmdldFBhdGhzKClcbiAgICAgICAgaWYgZWRpdG9yUGF0aC5pbmRleE9mKGRpcmVjdG9yeSkgPj0gMFxuICAgICAgICAgIHByb2plY3RGb2xkZXIgPSBkaXJlY3RvcnlcblxuICAgIHByb2plY3RGb2xkZXIgPSB1bmRlZmluZWQgaWYgcHJvamVjdEZvbGRlcj8uaW5kZXhPZignYXRvbTovLycpID49IDBcblxuICAgIGhvbWUgPSBpZiBwcm9jZXNzLnBsYXRmb3JtIGlzICd3aW4zMicgdGhlbiBwcm9jZXNzLmVudi5IT01FUEFUSCBlbHNlIHByb2Nlc3MuZW52LkhPTUVcblxuICAgIHN3aXRjaCBhdG9tLmNvbmZpZy5nZXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmNvcmUud29ya2luZ0RpcmVjdG9yeScpXG4gICAgICB3aGVuICdQcm9qZWN0JyB0aGVuIHB3ZCA9IHByb2plY3RGb2xkZXIgb3IgZWRpdG9yRm9sZGVyIG9yIGhvbWVcbiAgICAgIHdoZW4gJ0FjdGl2ZSBGaWxlJyB0aGVuIHB3ZCA9IGVkaXRvckZvbGRlciBvciBwcm9qZWN0Rm9sZGVyIG9yIGhvbWVcbiAgICAgIGVsc2UgcHdkID0gaG9tZVxuXG4gICAgaWQgPSBlZGl0b3JQYXRoIG9yIHByb2plY3RGb2xkZXIgb3IgaG9tZVxuICAgIGlkID0gZmlsZVBhdGg6IGlkLCBmb2xkZXJQYXRoOiBwYXRoLmRpcm5hbWUoaWQpXG5cbiAgICBzdGF0dXNJY29uID0gbmV3IFN0YXR1c0ljb24oKVxuICAgIHBsYXRmb3JtSU9UZXJtaW5hbFZpZXcgPSBuZXcgUGxhdGZvcm1JT1Rlcm1pbmFsVmlldyhpZCwgcHdkLCBzdGF0dXNJY29uLCB0aGlzLCBzaGVsbCwgYXJncywgZW52LCBhdXRvUnVuKVxuICAgIHN0YXR1c0ljb24uaW5pdGlhbGl6ZShwbGF0Zm9ybUlPVGVybWluYWxWaWV3KVxuXG4gICAgcGxhdGZvcm1JT1Rlcm1pbmFsVmlldy5hdHRhY2goKVxuXG4gICAgQHRlcm1pbmFsVmlld3MucHVzaCBwbGF0Zm9ybUlPVGVybWluYWxWaWV3XG4gICAgQHN0YXR1c0NvbnRhaW5lci5hcHBlbmQgc3RhdHVzSWNvblxuICAgIHJldHVybiBwbGF0Zm9ybUlPVGVybWluYWxWaWV3XG5cbiAgYWN0aXZlTmV4dFRlcm1pbmFsVmlldzogLT5cbiAgICBpbmRleCA9IEBpbmRleE9mKEBhY3RpdmVUZXJtaW5hbClcbiAgICByZXR1cm4gZmFsc2UgaWYgaW5kZXggPCAwXG4gICAgQGFjdGl2ZVRlcm1pbmFsVmlldyBpbmRleCArIDFcblxuICBhY3RpdmVQcmV2VGVybWluYWxWaWV3OiAtPlxuICAgIGluZGV4ID0gQGluZGV4T2YoQGFjdGl2ZVRlcm1pbmFsKVxuICAgIHJldHVybiBmYWxzZSBpZiBpbmRleCA8IDBcbiAgICBAYWN0aXZlVGVybWluYWxWaWV3IGluZGV4IC0gMVxuXG4gIGluZGV4T2Y6ICh2aWV3KSAtPlxuICAgIEB0ZXJtaW5hbFZpZXdzLmluZGV4T2YodmlldylcblxuICBhY3RpdmVUZXJtaW5hbFZpZXc6IChpbmRleCkgLT5cbiAgICByZXR1cm4gZmFsc2UgaWYgQHRlcm1pbmFsVmlld3MubGVuZ3RoIDwgMlxuXG4gICAgaWYgaW5kZXggPj0gQHRlcm1pbmFsVmlld3MubGVuZ3RoXG4gICAgICBpbmRleCA9IDBcbiAgICBpZiBpbmRleCA8IDBcbiAgICAgIGluZGV4ID0gQHRlcm1pbmFsVmlld3MubGVuZ3RoIC0gMVxuXG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gQHRlcm1pbmFsVmlld3NbaW5kZXhdXG4gICAgcmV0dXJuIHRydWVcblxuICBnZXRBY3RpdmVUZXJtaW5hbFZpZXc6IC0+XG4gICAgcmV0dXJuIEBhY3RpdmVUZXJtaW5hbFxuXG4gIGZvY3VzVGVybWluYWw6IC0+XG4gICAgcmV0dXJuIHVubGVzcyBAYWN0aXZlVGVybWluYWw/XG5cbiAgICBpZiB0ZXJtaW5hbCA9IFBsYXRmb3JtSU9UZXJtaW5hbFZpZXcuZ2V0Rm9jdXNlZFRlcm1pbmFsKClcbiAgICAgICAgQGFjdGl2ZVRlcm1pbmFsLmJsdXIoKVxuICAgIGVsc2VcbiAgICAgICAgQGFjdGl2ZVRlcm1pbmFsLmZvY3VzVGVybWluYWwoKVxuXG4gIGdldFRlcm1pbmFsQnlJZDogKHRhcmdldCwgc2VsZWN0b3IpIC0+XG4gICAgc2VsZWN0b3IgPz0gKHRlcm1pbmFsKSAtPiB0ZXJtaW5hbC5pZFxuXG4gICAgZm9yIGluZGV4IGluIFswIC4uIEB0ZXJtaW5hbFZpZXdzLmxlbmd0aF1cbiAgICAgIHRlcm1pbmFsID0gQHRlcm1pbmFsVmlld3NbaW5kZXhdXG4gICAgICBpZiB0ZXJtaW5hbD9cbiAgICAgICAgcmV0dXJuIHRlcm1pbmFsIGlmIHNlbGVjdG9yKHRlcm1pbmFsKSA9PSB0YXJnZXRcblxuICAgIHJldHVybiBudWxsXG5cbiAgdGVybWluYWxWaWV3Rm9yVGVybWluYWw6ICh0ZXJtaW5hbCkgLT5cbiAgICBmb3IgaW5kZXggaW4gWzAgLi4gQHRlcm1pbmFsVmlld3MubGVuZ3RoXVxuICAgICAgdGVybWluYWxWaWV3ID0gQHRlcm1pbmFsVmlld3NbaW5kZXhdXG4gICAgICBpZiB0ZXJtaW5hbFZpZXc/XG4gICAgICAgIHJldHVybiB0ZXJtaW5hbFZpZXcgaWYgdGVybWluYWxWaWV3LmdldFRlcm1pbmFsKCkgPT0gdGVybWluYWxcblxuICAgIHJldHVybiBudWxsXG5cbiAgcnVuSW5BY3RpdmVWaWV3OiAoY2FsbGJhY2spIC0+XG4gICAgdmlldyA9IEBnZXRBY3RpdmVUZXJtaW5hbFZpZXcoKVxuICAgIGlmIHZpZXc/XG4gICAgICByZXR1cm4gY2FsbGJhY2sodmlldylcbiAgICByZXR1cm4gbnVsbFxuXG4gIHJ1bk5ld1Rlcm1pbmFsOiAoKSAtPlxuICAgIEBhY3RpdmVUZXJtaW5hbCA9IEBjcmVhdGVFbXB0eVRlcm1pbmFsVmlldygpXG4gICAgQGFjdGl2ZVRlcm1pbmFsLnRvZ2dsZSgpXG4gICAgcmV0dXJuIEBhY3RpdmVUZXJtaW5hbFxuXG4gIHJ1bkNvbW1hbmRJbk5ld1Rlcm1pbmFsOiAoY29tbWFuZHMpIC0+XG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gQGNyZWF0ZVRlcm1pbmFsVmlldyhjb21tYW5kcylcbiAgICBAYWN0aXZlVGVybWluYWwudG9nZ2xlKClcblxuICBydW5Jbk9wZW5WaWV3OiAoY2FsbGJhY2spIC0+XG4gICAgdmlldyA9IEBnZXRBY3RpdmVUZXJtaW5hbFZpZXcoKVxuICAgIGlmIHZpZXc/IGFuZCB2aWV3LnBhbmVsLmlzVmlzaWJsZSgpXG4gICAgICByZXR1cm4gY2FsbGJhY2sodmlldylcbiAgICByZXR1cm4gbnVsbFxuXG4gIHNldEFjdGl2ZVRlcm1pbmFsVmlldzogKHZpZXcpIC0+XG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gdmlld1xuXG4gIHJlbW92ZVRlcm1pbmFsVmlldzogKHZpZXcpIC0+XG4gICAgaW5kZXggPSBAaW5kZXhPZiB2aWV3XG4gICAgcmV0dXJuIGlmIGluZGV4IDwgMFxuICAgIEB0ZXJtaW5hbFZpZXdzLnNwbGljZSBpbmRleCwgMVxuXG4gICAgQGFjdGl2YXRlQWRqYWNlbnRUZXJtaW5hbCBpbmRleFxuXG4gIGFjdGl2YXRlQWRqYWNlbnRUZXJtaW5hbDogKGluZGV4PTApIC0+XG4gICAgcmV0dXJuIGZhbHNlIHVubGVzcyBAdGVybWluYWxWaWV3cy5sZW5ndGggPiAwXG5cbiAgICBpbmRleCA9IE1hdGgubWF4KDAsIGluZGV4IC0gMSlcbiAgICBAYWN0aXZlVGVybWluYWwgPSBAdGVybWluYWxWaWV3c1tpbmRleF1cblxuICAgIHJldHVybiB0cnVlXG5cbiAgbmV3VGVybWluYWxWaWV3OiAtPlxuICAgIHJldHVybiBpZiBAYWN0aXZlVGVybWluYWw/LmFuaW1hdGluZ1xuXG4gICAgQGFjdGl2ZVRlcm1pbmFsID0gQGNyZWF0ZVRlcm1pbmFsVmlldygpXG4gICAgQGFjdGl2ZVRlcm1pbmFsLnRvZ2dsZSgpXG5cbiAgYXR0YWNoOiAtPlxuICAgIEBzdGF0dXNCYXJQcm92aWRlci5hZGRMZWZ0VGlsZShpdGVtOiB0aGlzLCBwcmlvcml0eTogLTkzKVxuXG4gIGRlc3Ryb3lBY3RpdmVUZXJtOiAtPlxuICAgIHJldHVybiB1bmxlc3MgQGFjdGl2ZVRlcm1pbmFsP1xuXG4gICAgaW5kZXggPSBAaW5kZXhPZihAYWN0aXZlVGVybWluYWwpXG4gICAgQGFjdGl2ZVRlcm1pbmFsLmRlc3Ryb3koKVxuICAgIEBhY3RpdmVUZXJtaW5hbCA9IG51bGxcblxuICAgIEBhY3RpdmF0ZUFkamFjZW50VGVybWluYWwgaW5kZXhcblxuICBjbG9zZUFsbDogPT5cbiAgICBmb3IgaW5kZXggaW4gW0B0ZXJtaW5hbFZpZXdzLmxlbmd0aCAuLiAwXVxuICAgICAgdmlldyA9IEB0ZXJtaW5hbFZpZXdzW2luZGV4XVxuICAgICAgaWYgdmlldz9cbiAgICAgICAgdmlldy5kZXN0cm95KClcbiAgICBAYWN0aXZlVGVybWluYWwgPSBudWxsXG5cbiAgZGVzdHJveTogLT5cbiAgICBAc3Vic2NyaXB0aW9ucy5kaXNwb3NlKClcbiAgICBmb3IgdmlldyBpbiBAdGVybWluYWxWaWV3c1xuICAgICAgdmlldy5wdHlQcm9jZXNzLnRlcm1pbmF0ZSgpXG4gICAgICB2aWV3LnRlcm1pbmFsLmRlc3Ryb3koKVxuICAgIEBkZXRhY2goKVxuXG4gIHRvZ2dsZTogLT5cbiAgICBpZiBAdGVybWluYWxWaWV3cy5sZW5ndGggPT0gMFxuICAgICAgQGFjdGl2ZVRlcm1pbmFsID0gQGNyZWF0ZVRlcm1pbmFsVmlldygpXG4gICAgZWxzZSBpZiBAYWN0aXZlVGVybWluYWwgPT0gbnVsbFxuICAgICAgQGFjdGl2ZVRlcm1pbmFsID0gQHRlcm1pbmFsVmlld3NbMF1cbiAgICBAYWN0aXZlVGVybWluYWwudG9nZ2xlKClcblxuICBjbGVhcjogLT5cbiAgICBAZGVzdHJveUFjdGl2ZVRlcm0oKVxuICAgIEBuZXdUZXJtaW5hbFZpZXcoKVxuXG4gIHNldFN0YXR1c0NvbG9yOiAoZXZlbnQpIC0+XG4gICAgY29sb3IgPSBldmVudC50eXBlLm1hdGNoKC9cXHcrJC8pWzBdXG4gICAgY29sb3IgPSBhdG9tLmNvbmZpZy5nZXQoXCJwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC5pY29uQ29sb3JzLiN7Y29sb3J9XCIpLnRvUkdCQVN0cmluZygpXG4gICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5waW8tdGVybWluYWwtc3RhdHVzLWljb24nKS5jc3MgJ2NvbG9yJywgY29sb3JcblxuICBjbGVhclN0YXR1c0NvbG9yOiAoZXZlbnQpIC0+XG4gICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5waW8tdGVybWluYWwtc3RhdHVzLWljb24nKS5jc3MgJ2NvbG9yJywgJydcblxuICBvbkRyYWdTdGFydDogKGV2ZW50KSA9PlxuICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEgJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLXBhbmVsJywgJ3RydWUnXG5cbiAgICBlbGVtZW50ID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5waW8tdGVybWluYWwtc3RhdHVzLWljb24nKVxuICAgIGVsZW1lbnQuYWRkQ2xhc3MgJ2lzLWRyYWdnaW5nJ1xuICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEgJ2Zyb20taW5kZXgnLCBlbGVtZW50LmluZGV4KClcblxuICBvbkRyYWdMZWF2ZTogKGV2ZW50KSA9PlxuICAgIEByZW1vdmVQbGFjZWhvbGRlcigpXG5cbiAgb25EcmFnRW5kOiAoZXZlbnQpID0+XG4gICAgQGNsZWFyRHJvcFRhcmdldCgpXG5cbiAgb25EcmFnT3ZlcjogKGV2ZW50KSA9PlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgIHVubGVzcyBldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbCcpIGlzICd0cnVlJ1xuICAgICAgcmV0dXJuXG5cbiAgICBuZXdEcm9wVGFyZ2V0SW5kZXggPSBAZ2V0RHJvcFRhcmdldEluZGV4KGV2ZW50KVxuICAgIHJldHVybiB1bmxlc3MgbmV3RHJvcFRhcmdldEluZGV4P1xuICAgIEByZW1vdmVEcm9wVGFyZ2V0Q2xhc3NlcygpXG4gICAgc3RhdHVzSWNvbnMgPSBAc3RhdHVzQ29udGFpbmVyLmNoaWxkcmVuICcucGlvLXRlcm1pbmFsLXN0YXR1cy1pY29uJ1xuXG4gICAgaWYgbmV3RHJvcFRhcmdldEluZGV4IDwgc3RhdHVzSWNvbnMubGVuZ3RoXG4gICAgICBlbGVtZW50ID0gc3RhdHVzSWNvbnMuZXEobmV3RHJvcFRhcmdldEluZGV4KS5hZGRDbGFzcyAnaXMtZHJvcC10YXJnZXQnXG4gICAgICBAZ2V0UGxhY2Vob2xkZXIoKS5pbnNlcnRCZWZvcmUoZWxlbWVudClcbiAgICBlbHNlXG4gICAgICBlbGVtZW50ID0gc3RhdHVzSWNvbnMuZXEobmV3RHJvcFRhcmdldEluZGV4IC0gMSkuYWRkQ2xhc3MgJ2Ryb3AtdGFyZ2V0LWlzLWFmdGVyJ1xuICAgICAgQGdldFBsYWNlaG9sZGVyKCkuaW5zZXJ0QWZ0ZXIoZWxlbWVudClcblxuICBvbkRyb3A6IChldmVudCkgPT5cbiAgICB7ZGF0YVRyYW5zZmVyfSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnRcbiAgICBwYW5lbEV2ZW50ID0gZGF0YVRyYW5zZmVyLmdldERhdGEoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLXBhbmVsJykgaXMgJ3RydWUnXG4gICAgdGFiRXZlbnQgPSBkYXRhVHJhbnNmZXIuZ2V0RGF0YSgncGxhdGZvcm1pby1pZGUtdGVybWluYWwtdGFiJykgaXMgJ3RydWUnXG4gICAgcmV0dXJuIHVubGVzcyBwYW5lbEV2ZW50IG9yIHRhYkV2ZW50XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIHRvSW5kZXggPSBAZ2V0RHJvcFRhcmdldEluZGV4KGV2ZW50KVxuICAgIEBjbGVhckRyb3BUYXJnZXQoKVxuXG4gICAgaWYgdGFiRXZlbnRcbiAgICAgIGZyb21JbmRleCA9IHBhcnNlSW50KGRhdGFUcmFuc2Zlci5nZXREYXRhKCdzb3J0YWJsZS1pbmRleCcpKVxuICAgICAgcGFuZUluZGV4ID0gcGFyc2VJbnQoZGF0YVRyYW5zZmVyLmdldERhdGEoJ2Zyb20tcGFuZS1pbmRleCcpKVxuICAgICAgcGFuZSA9IGF0b20ud29ya3NwYWNlLmdldFBhbmVzKClbcGFuZUluZGV4XVxuICAgICAgdmlldyA9IHBhbmUuaXRlbUF0SW5kZXgoZnJvbUluZGV4KVxuICAgICAgcGFuZS5yZW1vdmVJdGVtKHZpZXcsIGZhbHNlKVxuICAgICAgdmlldy5zaG93KClcblxuICAgICAgdmlldy50b2dnbGVUYWJWaWV3KClcbiAgICAgIEB0ZXJtaW5hbFZpZXdzLnB1c2ggdmlld1xuICAgICAgdmlldy5vcGVuKCkgaWYgdmlldy5zdGF0dXNJY29uLmlzQWN0aXZlKClcbiAgICAgIEBzdGF0dXNDb250YWluZXIuYXBwZW5kIHZpZXcuc3RhdHVzSWNvblxuICAgICAgZnJvbUluZGV4ID0gQHRlcm1pbmFsVmlld3MubGVuZ3RoIC0gMVxuICAgIGVsc2VcbiAgICAgIGZyb21JbmRleCA9IHBhcnNlSW50KGRhdGFUcmFuc2Zlci5nZXREYXRhKCdmcm9tLWluZGV4JykpXG4gICAgQHVwZGF0ZU9yZGVyKGZyb21JbmRleCwgdG9JbmRleClcblxuICBvbkRyb3BUYWJCYXI6IChldmVudCwgcGFuZSkgPT5cbiAgICB7ZGF0YVRyYW5zZmVyfSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnRcbiAgICByZXR1cm4gdW5sZXNzIGRhdGFUcmFuc2Zlci5nZXREYXRhKCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbC1wYW5lbCcpIGlzICd0cnVlJ1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgQGNsZWFyRHJvcFRhcmdldCgpXG5cbiAgICBmcm9tSW5kZXggPSBwYXJzZUludChkYXRhVHJhbnNmZXIuZ2V0RGF0YSgnZnJvbS1pbmRleCcpKVxuICAgIHZpZXcgPSBAdGVybWluYWxWaWV3c1tmcm9tSW5kZXhdXG4gICAgdmlldy5jc3MgXCJoZWlnaHRcIiwgXCJcIlxuICAgIHZpZXcudGVybWluYWwuZWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIlwiXG4gICAgdGFiQmFyID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy50YWItYmFyJylcblxuICAgIHZpZXcudG9nZ2xlVGFiVmlldygpXG4gICAgQHJlbW92ZVRlcm1pbmFsVmlldyB2aWV3XG4gICAgQHN0YXR1c0NvbnRhaW5lci5jaGlsZHJlbigpLmVxKGZyb21JbmRleCkuZGV0YWNoKClcbiAgICB2aWV3LnN0YXR1c0ljb24ucmVtb3ZlVG9vbHRpcCgpXG5cbiAgICBwYW5lLmFkZEl0ZW0gdmlldywgcGFuZS5nZXRJdGVtcygpLmxlbmd0aFxuICAgIHBhbmUuYWN0aXZhdGVJdGVtIHZpZXdcblxuICAgIHZpZXcuZm9jdXMoKVxuXG4gIGNsZWFyRHJvcFRhcmdldDogLT5cbiAgICBlbGVtZW50ID0gQGZpbmQoJy5pcy1kcmFnZ2luZycpXG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyAnaXMtZHJhZ2dpbmcnXG4gICAgQHJlbW92ZURyb3BUYXJnZXRDbGFzc2VzKClcbiAgICBAcmVtb3ZlUGxhY2Vob2xkZXIoKVxuXG4gIHJlbW92ZURyb3BUYXJnZXRDbGFzc2VzOiAtPlxuICAgIEBzdGF0dXNDb250YWluZXIuZmluZCgnLmlzLWRyb3AtdGFyZ2V0JykucmVtb3ZlQ2xhc3MgJ2lzLWRyb3AtdGFyZ2V0J1xuICAgIEBzdGF0dXNDb250YWluZXIuZmluZCgnLmRyb3AtdGFyZ2V0LWlzLWFmdGVyJykucmVtb3ZlQ2xhc3MgJ2Ryb3AtdGFyZ2V0LWlzLWFmdGVyJ1xuXG4gIGdldERyb3BUYXJnZXRJbmRleDogKGV2ZW50KSAtPlxuICAgIHRhcmdldCA9ICQoZXZlbnQudGFyZ2V0KVxuICAgIHJldHVybiBpZiBAaXNQbGFjZWhvbGRlcih0YXJnZXQpXG5cbiAgICBzdGF0dXNJY29ucyA9IEBzdGF0dXNDb250YWluZXIuY2hpbGRyZW4oJy5waW8tdGVybWluYWwtc3RhdHVzLWljb24nKVxuICAgIGVsZW1lbnQgPSB0YXJnZXQuY2xvc2VzdCgnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpXG4gICAgZWxlbWVudCA9IHN0YXR1c0ljb25zLmxhc3QoKSBpZiBlbGVtZW50Lmxlbmd0aCBpcyAwXG5cbiAgICByZXR1cm4gMCB1bmxlc3MgZWxlbWVudC5sZW5ndGhcblxuICAgIGVsZW1lbnRDZW50ZXIgPSBlbGVtZW50Lm9mZnNldCgpLmxlZnQgKyBlbGVtZW50LndpZHRoKCkgLyAyXG5cbiAgICBpZiBldmVudC5vcmlnaW5hbEV2ZW50LnBhZ2VYIDwgZWxlbWVudENlbnRlclxuICAgICAgc3RhdHVzSWNvbnMuaW5kZXgoZWxlbWVudClcbiAgICBlbHNlIGlmIGVsZW1lbnQubmV4dCgnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpLmxlbmd0aCA+IDBcbiAgICAgIHN0YXR1c0ljb25zLmluZGV4KGVsZW1lbnQubmV4dCgnLnBpby10ZXJtaW5hbC1zdGF0dXMtaWNvbicpKVxuICAgIGVsc2VcbiAgICAgIHN0YXR1c0ljb25zLmluZGV4KGVsZW1lbnQpICsgMVxuXG4gIGdldFBsYWNlaG9sZGVyOiAtPlxuICAgIEBwbGFjZWhvbGRlckVsID89ICQoJzxsaSBjbGFzcz1cInBsYWNlaG9sZGVyXCI+PC9saT4nKVxuXG4gIHJlbW92ZVBsYWNlaG9sZGVyOiAtPlxuICAgIEBwbGFjZWhvbGRlckVsPy5yZW1vdmUoKVxuICAgIEBwbGFjZWhvbGRlckVsID0gbnVsbFxuXG4gIGlzUGxhY2Vob2xkZXI6IChlbGVtZW50KSAtPlxuICAgIGVsZW1lbnQuaXMoJy5wbGFjZWhvbGRlcicpXG5cbiAgaWNvbkF0SW5kZXg6IChpbmRleCkgLT5cbiAgICBAZ2V0U3RhdHVzSWNvbnMoKS5lcShpbmRleClcblxuICBnZXRTdGF0dXNJY29uczogLT5cbiAgICBAc3RhdHVzQ29udGFpbmVyLmNoaWxkcmVuKCcucGlvLXRlcm1pbmFsLXN0YXR1cy1pY29uJylcblxuICBtb3ZlSWNvblRvSW5kZXg6IChpY29uLCB0b0luZGV4KSAtPlxuICAgIGZvbGxvd2luZ0ljb24gPSBAZ2V0U3RhdHVzSWNvbnMoKVt0b0luZGV4XVxuICAgIGNvbnRhaW5lciA9IEBzdGF0dXNDb250YWluZXJbMF1cbiAgICBpZiBmb2xsb3dpbmdJY29uP1xuICAgICAgY29udGFpbmVyLmluc2VydEJlZm9yZShpY29uLCBmb2xsb3dpbmdJY29uKVxuICAgIGVsc2VcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uKVxuXG4gIG1vdmVUZXJtaW5hbFZpZXc6IChmcm9tSW5kZXgsIHRvSW5kZXgpID0+XG4gICAgYWN0aXZlVGVybWluYWwgPSBAZ2V0QWN0aXZlVGVybWluYWxWaWV3KClcbiAgICB2aWV3ID0gQHRlcm1pbmFsVmlld3Muc3BsaWNlKGZyb21JbmRleCwgMSlbMF1cbiAgICBAdGVybWluYWxWaWV3cy5zcGxpY2UgdG9JbmRleCwgMCwgdmlld1xuICAgIEBzZXRBY3RpdmVUZXJtaW5hbFZpZXcgYWN0aXZlVGVybWluYWxcblxuICB1cGRhdGVPcmRlcjogKGZyb21JbmRleCwgdG9JbmRleCkgLT5cbiAgICByZXR1cm4gaWYgZnJvbUluZGV4IGlzIHRvSW5kZXhcbiAgICB0b0luZGV4LS0gaWYgZnJvbUluZGV4IDwgdG9JbmRleFxuXG4gICAgaWNvbiA9IEBnZXRTdGF0dXNJY29ucygpLmVxKGZyb21JbmRleCkuZGV0YWNoKClcbiAgICBAbW92ZUljb25Ub0luZGV4IGljb24uZ2V0KDApLCB0b0luZGV4XG4gICAgQG1vdmVUZXJtaW5hbFZpZXcgZnJvbUluZGV4LCB0b0luZGV4XG4gICAgaWNvbi5hZGRDbGFzcyAnaW5zZXJ0ZWQnXG4gICAgaWNvbi5vbmUgJ3dlYmtpdEFuaW1hdGlvbkVuZCcsIC0+IGljb24ucmVtb3ZlQ2xhc3MoJ2luc2VydGVkJylcbiJdfQ==
