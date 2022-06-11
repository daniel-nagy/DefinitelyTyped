// $ExpectAssignable
const dialogStyle: Dialogify.DialogStyle = {
    style: {},
    className: '',
    contentStyle: {},
    contentClassName: '',
};
// $ExpectAssignable
const buttonStyle: Dialogify.ButtonStyle = {
    image: '',
    style: {},
    className: '',
};
// $ExpectAssignable
const dialogOptions: Dialogify.DialogOptions = {
    size: Dialogify.SIZE_LARGE,
    closable: true,
    fixed: true,
    dialog: dialogStyle,
    closeButton: buttonStyle,
    useDialogForm: true,
    ajaxPrefix: '/',
    ajaxData: '',
    ajaxComplete: () => void 0,
};

// $ExpectError
new Dialogify();
// $ExpectError
new Dialogify('', '');
// $ExpectType Dialogify
const dialog = new Dialogify('source', dialogOptions);

// $ExpectType JQuery<HTMLElement>
dialog.$content;
// $ExpectType Record<string | number, ButtonImpl>
dialog.$buttonList;

// $ExpectError
dialog.title();
// $ExpectError
dialog.title(0);
// $ExpectType Dialogify
dialog.title('');
// $ExpectError
dialog.title('', '');

// $ExpectAssignable
const buttons: Array<Dialogify.Button | string> = [
    {
        type: '',
        text: '',
        click: () => void 0,
        focused: true,
        disabled: false,
        id: '',
    },
    '',
];

// $ExpectAssignable
const options: Dialogify.ButtonOption = {
    position: '',
};

// $ExpectError
dialog.buttons();
// $ExpectError
dialog.buttons('', '');
// $ExpectType Dialogify
dialog.buttons(buttons);
// $ExpectType Dialogify
dialog.buttons(buttons, options);
// $ExpectError
dialog.buttons(buttons, options, '');

// $ExpectError
dialog.on();
// $ExpectError
dialog.on('', () => {});
// $ExpectType Dialogify
dialog.on('show', () => {});
// $ExpectType Dialogify
dialog.on('close', () => {});
// $ExpectType Dialogify
dialog.on('cancel', () => {});
// $ExpectError
dialog.on('', {});

// $ExpectType void
dialog.show();
// $ExpectError
dialog.show(0);

// $ExpectType void
dialog.showModal();
// $ExpectError
dialog.showModal(0);

// $ExpectType void
dialog.close();
// $ExpectError
dialog.close(0);

// $ExpectType boolean
dialog.isOpen();
// $ExpectError
dialog.isOpen(0);

/** Static methods */

// $ExpectAssignable
const alertOptions: Dialogify.AlertDialogOptions = {};
// $ExpectType void
Dialogify.alert('', alertOptions);
// $ExpectError
Dialogify.alert();
// $ExpectError
Dialogify.alert(0);
// $ExpectError
Dialogify.alert('', '');
// $ExpectError
Dialogify.alert('', alertOptions, null);

// $ExpectAssignable
const confirmOptions: Dialogify.ConfirmDialogOptions = {};
// $ExpectType void
Dialogify.confirm('', confirmOptions);
// $ExpectError
Dialogify.confirm();
// $ExpectError
Dialogify.confirm(0);
// $ExpectError
Dialogify.confirm('', '');
// $ExpectError
Dialogify.confirm('', confirmOptions, null);

// $ExpectAssignable
const promptOptions: Dialogify.PromptDialogOptions = {};
// $ExpectType void
Dialogify.prompt('', promptOptions);
// $ExpectError
Dialogify.prompt();
// $ExpectError
Dialogify.prompt(0);
// $ExpectError
Dialogify.prompt('', '');
// $ExpectError
Dialogify.prompt('', promptOptions, null);

// $ExpectType void
Dialogify.closeAll();

// == Following examples from Dialogify documentation ==
// Example 1: Normal Dialogify

new Dialogify('#demo1_template')
    .title('Dialogify')
    .buttons([
        {
            text: '取消',
            click(e) {
                console.log('cancel click');
                this.close();
            },
        },
        {
            text: '確定',
            type: Dialogify.BUTTON_PRIMARY,
            click(e) {
                console.log('ok click, title value: ' + this.$content.find('input.text-field').val());
            },
        },
    ])
    .show();

// Example 2: Modal Dialogify

let example2_html =
    '<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a sapien lacus. Ut a eros quis lacus auctor aliquet eu.</b>';
let example2_dialogify = new Dialogify(example2_html).title('Modal Dialogify').buttons(
    [
        {
            type: Dialogify.BUTTON_DANGER,
            click(e) {
                console.log('danger-style button click');
                this.close();
            },
        },
        '<a class="btn btn-insert" href="javascript:;">other action</a>',
    ],
    { position: Dialogify.BUTTON_CENTER },
);

example2_dialogify
    .on('show', function() {
        this.$buttonList[1].disable();
        console.log('show: ' + this.isOpen());
    })
    .on('close', function() {
        console.log('close: ' + this.isOpen());
    })
    .on('cancel', () => {
        console.log('cancel');
    });

// Example 3: Ajax Dialogify

let example3_options: Dialogify.DialogOptions = {
    ajaxPrefix: '',
    ajaxComplete() {
        console.log('ajax complete');
        this.buttons([
            {
                type: Dialogify.BUTTON_PRIMARY,
            },
        ]);
    },
};

new Dialogify('./ajax.html', example3_options).title('Ajax Dialogify').show();

// Example 4: Style Dialogify

let example4_options = {
    dialog: {
        style: { 'background-color': 'transparent', 'box-shadow': 'none' },
        contentClassName: 'custom-content',
    },
    closeButton: {
        image: 'img/x.png',
        className: 'custom-close',
    },
};

let example4_html =
    '<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a sapien lacus. Ut a eros quis lacus auctor aliquet eu.</b>';
new Dialogify(example4_html, example4_options)
    .title('Style Dialogify')
    .buttons([
        {
            type: Dialogify.BUTTON_PRIMARY,
        },
    ])
    .show();

// Example 5: Dialogify.alert

Dialogify.alert('Alert <i>Message</i>', {
    close() {
        console.log('alert close');
    },
    dialogOptions: {
        closable: false,
    },
});

// Example 6: Dialogify.confirm

Dialogify.confirm('Do you like Dialogify ?', {
    ok() {
        Dialogify.alert('Yes, I do');
    },
    cancel() {
        Dialogify.alert("No, I don't");
    },
});

// Example 7: Dialogify.prompt

Dialogify.prompt("What's your name ?", {
    placeholder: 'Enter your name',
    ok(val) {
        Dialogify.alert('Hi! ' + val);
    },
    cancel() {
        Dialogify.alert('canceled');
    },
});
