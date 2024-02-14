let loginpage = `
<div id="gamediv" class="bg-green d-flex justify-content-center align-items-center vh-100">
    <!-- login form div -->
    <div>
        <p class="text-white" > welcome to card game! </p>
        <!-- name field div -->
        <div>
            <input type="text" placeholder="name">
        </div>
        <!-- game type div -->
        <div>
            <select class="w-100">
                <option value="blackjack">blackjack </option>
                <option value="poker">poker </option>
            </select>j
        </div>
        <!-- submit div -->
        <div>
            <a href="" class="btn btn-success">start game </a>
        </div>
    </div>
</div> 
`;

let page2 = `
<!--gamedisplay-->
<div id="gamediv" class="d-flex justify-content-center align-items-center vh-100">
    <!-- all cards (dealer, players) div -->
    <div class="col-12">
        <div class="pt-5">
            <p class="m-0 text-center text-white rem3">dealer</p>

            <!-- house card row -->
            <div id="houescarddiv" class="d-flex justify-content-center pt-3 pb-5">

                <div class="bg-white border mx-2">
                    <div class="text-center">
                        <img src="/img/spade.png" alt="" width="50" height="50">
                    </div>
                    <div class="text-center">
                        <p class="m-0 ">7</p>
                    </div>
                </div>

                <div class="bg-white border mx-2">
                    <div class="text-center">
                        <img src="/img/diamond.png" alt="" width="50" height="50">
                    </div>
                    <div class="text-center">
                        <p class="m-0">8</p>
                    </div>
                </div>

                <div class="bg-white border mx-2">
                    <div class="text-center">
                        <img src="/img/heart.png" alt="" width="50" height="50">
                    </div>
                    <div class="text-center">
                        <p class="m-0">9</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="">

            <!-- players div -->
            <div id="playersdiv" class="d-flex justify-content-center">

                <!-- noncurplayerdiv 1-->
                <div id="noncurplayer1div" class="flex-column">

                    <p class="m-0 text-white text-center rem3">ai1</p>

                    <!-- playerinfodiv -->
                    <div class="text-white d-flex m-0 p-0 justify-content-between">
                        <p class="rem1 text-left">s:bust </a>
                        <p class="rem1 text-left">b:0 </a>
                        <p class="rem1 text-left">r:255 </a>
                    </div>
                    <!-- cardsdiv -->
                    <div class="d-flex justify-content-center">
                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/heart.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">2</p>
                            </div>
                        </div>
                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/clover.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">10</p>
                            </div>
                        </div>
                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/spade.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">8</p>
                            </div>
                        </div><!-- end card -->
                    </div><!-- end cards -->
                </div><!-- end player -->

                <!-- curplayerdiv -->
                <div id = "curplayerdiv" class="flex-column w-50">
                    <p class="m-0 text-white text-center rem3">ai2</p>

                    <!-- playerinfodiv -->
                    <div class="text-white d-flex m-0 p-0 justify-content-center">
                        <p class="rem1 text-left">s:bust </a>
                        <p class="rem1 text-left">b:0 </a>
                        <p class="rem1 text-left">r:255 </a>
                    </div>

                    <!-- cardsdiv -->
                    <div class="d-flex justify-content-center">
                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/heart.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">2</p>
                            </div>
                        </div>
                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/clover.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">10</p>
                            </div>
                        </div>
                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/spade.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">8</p>
                            </div>
                        </div><!-- end card -->
                    </div><!-- end cards -->
                </div><!-- end player -->

                <!-- noncurplayer2div -->
                <div id="noncurplayer2div" class="flex-column">

                    <p class="m-0 text-white text-center rem3">yuki</p>

                    <!-- playerinfodiv -->
                    <div class="text-white d-flex m-0 p-0 justify-content-between">
                        <p class="rem1 text-left">s:bust </a>
                        <p class="rem1 text-left">b:0 </a>
                        <p class="rem1 text-left">r:255 </a>
                    </div>

                    <!-- cardsdiv -->
                    <div class="d-flex justify-content-center">
                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/heart.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">2</p>
                            </div>
                        </div>
                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/clover.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">10</p>
                            </div>
                        </div>
                        <div class="bg-white border mx-2">
                            <div class="text-center">
                                <img src="/img/spade.png" alt="" width="50" height="50">
                            </div>
                            <div class="text-center">
                                <p class="m-0">8</p>
                            </div>
                        </div><!-- end card -->
                    </div><!-- end cards -->
                </div><!-- end player -->
            </div><!-- end players -->

            <!-- actionsandbetsdiv -->
            <div id="actionsandbetsdiv" class="d-flex pb-5 pt-4 justify-content-center">

                <!-- actionsdiv -->
                <div id ="actionsdiv" class="d-flex flex-wrap w-70">
                    <div class="py-2">
                        <a class="text-dark btn btn-light px-5 py-1">surrender</a>
                    </div>
                    <div class="py-2">
                        <a class="btn btn-success px-5 py-1">stand</a>
                    </div>
                    <div class="py-2">
                        <a class="btn btn-warning px-5 py-1">hit</a>
                    </div>
                    <div class="py-2">
                        <a class="btn btn-danger px-5 py-1">double</a>
                    </div>
                </div> <!-- end actionsdiv -->
            </div><!-- end actionsandbetsdiv-->
        </div>
    </div>
</div>
`;

let page3 = `
<!--gamedisplay2-->

<div id="gamediv" class="bg-green d-flex justify-content-center align-items-center vh-100">
        <!-- all cards (dealer, players) div -->
        <div class="col-12">
            <div class="pt-5">
                <p class="m-0 text-center text-white rem3">dealer</p>
    
                <!-- house card row -->
                <div id="houescarddiv" class="d-flex justify-content-center pt-3 pb-5">
    
                    <div class="bg-white border mx-2">
                        <div class="text-center">
                            <img src="/img/spade.png" alt="" width="50" height="50">
                        </div>
                        <div class="text-center">
                            <p class="m-0 ">7</p>
                        </div>
                    </div>
    
                    <div class="bg-white border mx-2">
                        <div class="text-center">
                            <img src="/img/diamond.png" alt="" width="50" height="50">
                        </div>
                        <div class="text-center">
                            <p class="m-0">8</p>
                        </div>
                    </div>
    
                    <div class="bg-white border mx-2">
                        <div class="text-center">
                            <img src="/img/heart.png" alt="" width="50" height="50">
                        </div>
                        <div class="text-center">
                            <p class="m-0">9</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="">
    
                <!-- players div -->
                <div id="playersdiv" class="d-flex justify-content-center">
    
                    <!-- noncurplayerdiv 1-->
                    <div id="noncurplayer1div" class="flex-column">
    
                        <p class="m-0 text-white text-center rem3">ai1</p>
    
                        <!-- playerinfodiv -->
                        <div class="text-white d-flex m-0 p-0 justify-content-between">
                            <p class="rem1 text-left">s:bust </a>
                            <p class="rem1 text-left">b:0 </a>
                            <p class="rem1 text-left">r:255 </a>
                        </div>
                        <!-- cardsdiv -->
                        <div class="d-flex justify-content-center">
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/heart.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">2</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/clover.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">10</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/spade.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">8</p>
                                </div>
                            </div><!-- end card -->
                        </div><!-- end cards -->
                    </div><!-- end player -->
    
                    <!-- curplayerdiv -->
                    <div id = "curplayerdiv" class="flex-column w-50">
                        <p class="m-0 text-white text-center rem3">ai2</p>
    
                        <!-- playerinfodiv -->
                        <div class="text-white d-flex m-0 p-0 justify-content-center">
                            <p class="rem1 text-left">s:bust </a>
                            <p class="rem1 text-left">b:0 </a>
                            <p class="rem1 text-left">r:255 </a>
                        </div>
    
                        <!-- cardsdiv -->
                        <div class="d-flex justify-content-center">
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/heart.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">2</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/clover.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">10</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/spade.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">8</p>
                                </div>
                            </div><!-- end card -->
                        </div><!-- end cards -->
                    </div><!-- end player -->
    
                    <!-- noncurplayer2div -->
                    <div id="noncurplayer2div" class="flex-column">
    
                        <p class="m-0 text-white text-center rem3">yuki</p>
    
                        <!-- playerinfodiv -->
                        <div class="text-white d-flex m-0 p-0 justify-content-between">
                            <p class="rem1 text-left">s:bust </a>
                            <p class="rem1 text-left">b:0 </a>
                            <p class="rem1 text-left">r:255 </a>
                        </div>
    
                        <!-- cardsdiv -->
                        <div class="d-flex justify-content-center">
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/heart.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">2</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/clover.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">10</p>
                                </div>
                            </div>
                            <div class="bg-white border mx-2">
                                <div class="text-center">
                                    <img src="/img/spade.png" alt="" width="50" height="50">
                                </div>
                                <div class="text-center">
                                    <p class="m-0">8</p>
                                </div>
                            </div><!-- end card -->
                        </div><!-- end cards -->
                    </div><!-- end player -->
                </div><!-- end players -->
    
                <!-- actionsandbetsdiv -->
                <div id="actionsandbetsdiv" class="d-flex pb-5 pt-4 justify-content-center">
                     <!-- betsdiv -->
                    <div id="betsdiv" class="d-flex flex-column w-50">
                        <!-- bottom half of bets including chip increments and submit  -->
                        <div class="py-2 h-60 d-flex justify-content-between">
                            <!-- betchoicediv -->
                            <div>
                                <div class="input-group" >
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger btn-number">
                                            -
                                        </button>
                                    </span>
                                    <input type="text" class="input-number text-center" size="2" maxlength="5" value="3">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-success btn-number">
                                            +
                                        </button>
                                    </span>
                                </div><!--end input group div -->
                                <p class="text-white text-center">5</p>
                            </div> <!-- end betchoicediv -->
                            <!-- betchoicediv -->
                            <div>
                                <div class="input-group" >
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger btn-number">
                                            -
                                        </button>
                                    </span>
                                    <input type="text" class="input-number text-center" size="2" maxlength="5" value="0">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-success btn-number">
                                            +
                                        </button>
                                    </span>
                                </div><!--end input group div -->
                                <p class="text-white text-center">20</p>
                            </div> <!-- end betchoicediv -->
                            <!-- betchoicediv -->
                            <div>
                                <div class="input-group" >
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger btn-number">
                                            -
                                        </button>
                                    </span>
                                    <input type="text" class="input-number text-center" size="2" maxlength="5" value="0">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-success btn-number">
                                            +
                                        </button>
                                    </span>
                                </div><!--end input group div -->
                                <p class="text-white text-center">50</p>
                            </div> <!-- end betchoicediv -->
                            <!-- betchoicediv -->
                            <div>
                                <div class="input-group" >
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-danger btn-number">
                                            -
                                        </button>
                                    </span>
                                    <input type="text" class="input-number text-center" size="2" maxlength="5" value="0">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-success btn-number">
                                            +
                                        </button>
                                    </span>
                                </div><!--end input group div -->
                                <p class="text-white text-center">100</p>
                            </div> <!-- end betchoicediv -->
                        </div><!-- end bestselectiondiv -->
                        <!-- betsubmitdiv -->
                        <div class="w-100 btn-success rem5 text-center bg-primary">
                            submit your bet
                        </div><!-- end betsubmitdiv -->
                    </div><!-- end betsdiv-->
    
                </div><!-- end actionsandbetsdiv-->
            </div>
        </div>
    </div>
`;
