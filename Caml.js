var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Caml = (function (_super) {
    __extends(Caml, _super);
    function Caml(idCanvas) {
        var _this = this;
        this.IdCanvas = idCanvas;
        this.EventHandler = new CEventHandler();
        _super.call(this);
        this.Parent = null;
        this.ParentCanvas = document.getElementById(idCanvas);
        this.ParentContext = this.ParentCanvas.getContext("2d");
        this.Width = this.Height = "*";
        this.GetHTMLSize();
        window.addEventListener("resize", function () { return _this.EventHandler.Push(_this, "resize", null); });
    }
    Caml.prototype.GetHTMLSize = function () {
        if (this.ParentCanvas.attributes.getNamedItem('width') != null)
            this.Width = this.ParentCanvas.attributes.getNamedItem('width').value;
        if (this.ParentCanvas.attributes.getNamedItem('height') != null)
            this.Height = this.ParentCanvas.attributes.getNamedItem('height').value;
        if (this.Width != "*" && this.Width != "auto") {
            this.ActualWidth = +this.Width;
        }
        if (this.Height != "*" && this.Height != "auto") {
            this.ActualHeight = +this.Height;
        }
    };
    Caml.prototype.Reorganize = function () {
        if (this.NeedReorganize) {
            console.log("reorganize Caml");
            this.NeedReorganize = false;
        }
        _super.prototype.Reorganize.call(this);
    };
    Caml.prototype.Draw = function () {
        if (this.NeedDraw) {
            console.log("drawing Caml");
            this.NeedDraw = false;
            this.Canvas = document.createElement("Canvas");
            this.Canvas.width = this.ActualWidth;
            this.Canvas.height = this.ActualHeight;
            this.Context = this.Canvas.getContext("2d");
            this.Context.fillStyle = "red";
            this.Context.fillRect(10, 10, this.ActualWidth - 35, this.ActualHeight - 35);
            this.Context.strokeStyle = "black";
            this.Context.strokeRect(0, 1, this.ActualWidth, this.ActualHeight);
            _super.prototype.Draw.call(this);
            this.NeedRender = true;
        }
    };
    Caml.prototype.Render = function () {
        console.log("Rendring Caml");
        this.NeedRender = false;
        _super.prototype.Render.call(this);
        this.ParentContext.drawImage(this.Canvas, 0, 0, this.ActualWidth, this.ActualHeight, 0, 0, this.ActualWidth, this.ActualHeight);
    };
    Caml.prototype.RenderLoop = function () {
        var _this = this;
        if (this.NeedRender)
            this.Render();
        this.Reorganize();
        this.Draw();
        requestAnimationFrame(function () { return _this.RenderLoop(); });
    };
    Caml.prototype.Run = function () {
        this.Reorganize();
        this.Draw();
        this.RenderLoop();
    };
    return Caml;
})(CContentControl);