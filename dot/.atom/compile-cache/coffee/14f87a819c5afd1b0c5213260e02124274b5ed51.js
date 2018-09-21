(function() {
  var _, child, filteredEnvironment, fs, path, pty, systemLanguage;

  pty = require('pty.js');

  path = require('path');

  fs = require('fs');

  _ = require('underscore');

  child = require('child_process');

  systemLanguage = (function() {
    var command, language;
    language = "en_US.UTF-8";
    if (process.platform === 'darwin') {
      try {
        command = 'plutil -convert json -o - ~/Library/Preferences/.GlobalPreferences.plist';
        language = (JSON.parse(child.execSync(command).toString()).AppleLocale) + ".UTF-8";
      } catch (error) {}
    }
    return language;
  })();

  filteredEnvironment = (function() {
    var env;
    env = _.omit(process.env, 'ATOM_HOME', 'ELECTRON_RUN_AS_NODE', 'GOOGLE_API_KEY', 'NODE_ENV', 'NODE_PATH', 'userAgent', 'taskPath');
    if (env.LANG == null) {
      env.LANG = systemLanguage;
    }
    env.TERM_PROGRAM = 'platformio-ide-terminal';
    return env;
  })();

  module.exports = function(pwd, shell, args, env, options) {
    var callback, emitTitle, ptyProcess, title;
    if (options == null) {
      options = {};
    }
    callback = this.async();
    if (shell) {
      ptyProcess = pty.fork(shell, args, {
        cwd: pwd,
        env: _.extend(filteredEnvironment, env),
        name: 'xterm-256color'
      });
      title = shell = path.basename(shell);
    } else {
      ptyProcess = pty.open();
    }
    emitTitle = _.throttle(function() {
      return emit('platformio-ide-terminal:title', ptyProcess.process);
    }, 500, true);
    ptyProcess.on('data', function(data) {
      emit('platformio-ide-terminal:data', data);
      return emitTitle();
    });
    ptyProcess.on('exit', function() {
      emit('platformio-ide-terminal:exit');
      return callback();
    });
    return process.on('message', function(arg) {
      var cols, event, ref, rows, text;
      ref = arg != null ? arg : {}, event = ref.event, cols = ref.cols, rows = ref.rows, text = ref.text;
      switch (event) {
        case 'resize':
          return ptyProcess.resize(cols, rows);
        case 'input':
          return ptyProcess.write(text);
        case 'pty':
          return emit('platformio-ide-terminal:pty', ptyProcess.pty);
      }
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvbHVjYW1hcnRpbmVsbGkvLmF0b20vcGFja2FnZXMvcGxhdGZvcm1pby1pZGUtdGVybWluYWwvbGliL3Byb2Nlc3MuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVI7O0VBQ04sSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztFQUNQLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7RUFDTCxDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVI7O0VBQ0osS0FBQSxHQUFRLE9BQUEsQ0FBUSxlQUFSOztFQUVSLGNBQUEsR0FBb0IsQ0FBQSxTQUFBO0FBQ2xCLFFBQUE7SUFBQSxRQUFBLEdBQVc7SUFDWCxJQUFHLE9BQU8sQ0FBQyxRQUFSLEtBQW9CLFFBQXZCO0FBQ0U7UUFDRSxPQUFBLEdBQVU7UUFDVixRQUFBLEdBQWEsQ0FBQyxJQUFJLENBQUMsS0FBTCxDQUFXLEtBQUssQ0FBQyxRQUFOLENBQWUsT0FBZixDQUF1QixDQUFDLFFBQXhCLENBQUEsQ0FBWCxDQUE4QyxDQUFDLFdBQWhELENBQUEsR0FBNEQsU0FGM0U7T0FBQSxpQkFERjs7QUFJQSxXQUFPO0VBTlcsQ0FBQSxDQUFILENBQUE7O0VBUWpCLG1CQUFBLEdBQXlCLENBQUEsU0FBQTtBQUN2QixRQUFBO0lBQUEsR0FBQSxHQUFNLENBQUMsQ0FBQyxJQUFGLENBQU8sT0FBTyxDQUFDLEdBQWYsRUFBb0IsV0FBcEIsRUFBaUMsc0JBQWpDLEVBQXlELGdCQUF6RCxFQUEyRSxVQUEzRSxFQUF1RixXQUF2RixFQUFvRyxXQUFwRyxFQUFpSCxVQUFqSDs7TUFDTixHQUFHLENBQUMsT0FBUTs7SUFDWixHQUFHLENBQUMsWUFBSixHQUFtQjtBQUNuQixXQUFPO0VBSmdCLENBQUEsQ0FBSCxDQUFBOztFQU10QixNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLEdBQUQsRUFBTSxLQUFOLEVBQWEsSUFBYixFQUFtQixHQUFuQixFQUF3QixPQUF4QjtBQUNmLFFBQUE7O01BRHVDLFVBQVE7O0lBQy9DLFFBQUEsR0FBVyxJQUFDLENBQUEsS0FBRCxDQUFBO0lBRVgsSUFBRyxLQUFIO01BQ0UsVUFBQSxHQUFhLEdBQUcsQ0FBQyxJQUFKLENBQVMsS0FBVCxFQUFnQixJQUFoQixFQUNYO1FBQUEsR0FBQSxFQUFLLEdBQUw7UUFDQSxHQUFBLEVBQUssQ0FBQyxDQUFDLE1BQUYsQ0FBUyxtQkFBVCxFQUE4QixHQUE5QixDQURMO1FBRUEsSUFBQSxFQUFNLGdCQUZOO09BRFc7TUFLYixLQUFBLEdBQVEsS0FBQSxHQUFRLElBQUksQ0FBQyxRQUFMLENBQWMsS0FBZCxFQU5sQjtLQUFBLE1BQUE7TUFRRSxVQUFBLEdBQWEsR0FBRyxDQUFDLElBQUosQ0FBQSxFQVJmOztJQVVBLFNBQUEsR0FBWSxDQUFDLENBQUMsUUFBRixDQUFXLFNBQUE7YUFDckIsSUFBQSxDQUFLLCtCQUFMLEVBQXNDLFVBQVUsQ0FBQyxPQUFqRDtJQURxQixDQUFYLEVBRVYsR0FGVSxFQUVMLElBRks7SUFJWixVQUFVLENBQUMsRUFBWCxDQUFjLE1BQWQsRUFBc0IsU0FBQyxJQUFEO01BQ3BCLElBQUEsQ0FBSyw4QkFBTCxFQUFxQyxJQUFyQzthQUNBLFNBQUEsQ0FBQTtJQUZvQixDQUF0QjtJQUlBLFVBQVUsQ0FBQyxFQUFYLENBQWMsTUFBZCxFQUFzQixTQUFBO01BQ3BCLElBQUEsQ0FBSyw4QkFBTDthQUNBLFFBQUEsQ0FBQTtJQUZvQixDQUF0QjtXQUlBLE9BQU8sQ0FBQyxFQUFSLENBQVcsU0FBWCxFQUFzQixTQUFDLEdBQUQ7QUFDcEIsVUFBQTswQkFEcUIsTUFBMEIsSUFBekIsbUJBQU8saUJBQU0saUJBQU07QUFDekMsY0FBTyxLQUFQO0FBQUEsYUFDTyxRQURQO2lCQUNxQixVQUFVLENBQUMsTUFBWCxDQUFrQixJQUFsQixFQUF3QixJQUF4QjtBQURyQixhQUVPLE9BRlA7aUJBRW9CLFVBQVUsQ0FBQyxLQUFYLENBQWlCLElBQWpCO0FBRnBCLGFBR08sS0FIUDtpQkFHa0IsSUFBQSxDQUFLLDZCQUFMLEVBQW9DLFVBQVUsQ0FBQyxHQUEvQztBQUhsQjtJQURvQixDQUF0QjtFQXpCZTtBQXBCakIiLCJzb3VyY2VzQ29udGVudCI6WyJwdHkgPSByZXF1aXJlICdwdHkuanMnXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcbmZzID0gcmVxdWlyZSAnZnMnXG5fID0gcmVxdWlyZSAndW5kZXJzY29yZSdcbmNoaWxkID0gcmVxdWlyZSAnY2hpbGRfcHJvY2Vzcydcblxuc3lzdGVtTGFuZ3VhZ2UgPSBkbyAtPlxuICBsYW5ndWFnZSA9IFwiZW5fVVMuVVRGLThcIlxuICBpZiBwcm9jZXNzLnBsYXRmb3JtIGlzICdkYXJ3aW4nXG4gICAgdHJ5XG4gICAgICBjb21tYW5kID0gJ3BsdXRpbCAtY29udmVydCBqc29uIC1vIC0gfi9MaWJyYXJ5L1ByZWZlcmVuY2VzLy5HbG9iYWxQcmVmZXJlbmNlcy5wbGlzdCdcbiAgICAgIGxhbmd1YWdlID0gXCIje0pTT04ucGFyc2UoY2hpbGQuZXhlY1N5bmMoY29tbWFuZCkudG9TdHJpbmcoKSkuQXBwbGVMb2NhbGV9LlVURi04XCJcbiAgcmV0dXJuIGxhbmd1YWdlXG5cbmZpbHRlcmVkRW52aXJvbm1lbnQgPSBkbyAtPlxuICBlbnYgPSBfLm9taXQgcHJvY2Vzcy5lbnYsICdBVE9NX0hPTUUnLCAnRUxFQ1RST05fUlVOX0FTX05PREUnLCAnR09PR0xFX0FQSV9LRVknLCAnTk9ERV9FTlYnLCAnTk9ERV9QQVRIJywgJ3VzZXJBZ2VudCcsICd0YXNrUGF0aCdcbiAgZW52LkxBTkcgPz0gc3lzdGVtTGFuZ3VhZ2VcbiAgZW52LlRFUk1fUFJPR1JBTSA9ICdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbCdcbiAgcmV0dXJuIGVudlxuXG5tb2R1bGUuZXhwb3J0cyA9IChwd2QsIHNoZWxsLCBhcmdzLCBlbnYsIG9wdGlvbnM9e30pIC0+XG4gIGNhbGxiYWNrID0gQGFzeW5jKClcblxuICBpZiBzaGVsbFxuICAgIHB0eVByb2Nlc3MgPSBwdHkuZm9yayBzaGVsbCwgYXJncyxcbiAgICAgIGN3ZDogcHdkLFxuICAgICAgZW52OiBfLmV4dGVuZChmaWx0ZXJlZEVudmlyb25tZW50LCBlbnYpLFxuICAgICAgbmFtZTogJ3h0ZXJtLTI1NmNvbG9yJ1xuXG4gICAgdGl0bGUgPSBzaGVsbCA9IHBhdGguYmFzZW5hbWUgc2hlbGxcbiAgZWxzZVxuICAgIHB0eVByb2Nlc3MgPSBwdHkub3BlbigpXG5cbiAgZW1pdFRpdGxlID0gXy50aHJvdHRsZSAtPlxuICAgIGVtaXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOnRpdGxlJywgcHR5UHJvY2Vzcy5wcm9jZXNzKVxuICAsIDUwMCwgdHJ1ZVxuXG4gIHB0eVByb2Nlc3Mub24gJ2RhdGEnLCAoZGF0YSkgLT5cbiAgICBlbWl0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpkYXRhJywgZGF0YSlcbiAgICBlbWl0VGl0bGUoKVxuXG4gIHB0eVByb2Nlc3Mub24gJ2V4aXQnLCAtPlxuICAgIGVtaXQoJ3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmV4aXQnKVxuICAgIGNhbGxiYWNrKClcblxuICBwcm9jZXNzLm9uICdtZXNzYWdlJywgKHtldmVudCwgY29scywgcm93cywgdGV4dH09e30pIC0+XG4gICAgc3dpdGNoIGV2ZW50XG4gICAgICB3aGVuICdyZXNpemUnIHRoZW4gcHR5UHJvY2Vzcy5yZXNpemUoY29scywgcm93cylcbiAgICAgIHdoZW4gJ2lucHV0JyB0aGVuIHB0eVByb2Nlc3Mud3JpdGUodGV4dClcbiAgICAgIHdoZW4gJ3B0eScgdGhlbiBlbWl0KCdwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDpwdHknLCBwdHlQcm9jZXNzLnB0eSlcbiJdfQ==
