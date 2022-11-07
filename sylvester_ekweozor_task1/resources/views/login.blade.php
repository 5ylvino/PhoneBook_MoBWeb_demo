@extends('layouts.app')

@section('content')
        <div class="flex justify-center items-center my-[10rem]">
            <form method="POST" action="{{ url('auth-login-form') }}">
                @csrf
                {{-- login --}}
                <div class="w-[25rem] h-fit mx-[1rem] mb-[1rem] pb-[4px] border-[0.5px] border-[#fa000052] rounded-md bg-[#33333397]">
               
                    {{-- status --}}
                @if (session()->has('success'))
                    <div class="text-green-700 text-sm text-center" role="alert">
                        {{ session()->get('success') }}
                    </div>
                @endif
                @if (session()->has('failed'))
                    <div class="text-red-700 text-sm text-center" role="alert">
                        {{ session()->get('failed') }}
                    </div>
                @endif

                    {{-- title --}}
                    <h1 class="w-full text-center py-5 font-bold">Admin Portal</h1>

                    {{-- Username or email --}}
                    <div class="w-full my-[20px]">
                        <div class="flex justify-evenly items-center rounded-md border-[0.5px] border-[#808080a0] py-[5px] p-[15px] mx-[15px]">
                            <input
                                class="w-full bg-transparent border-none outline-none pl-[10px] @error('email') is-invalid @enderror"
                                type="text"
                                placeholder="Email"
                                name="email"
                                value="{{ old('email') }}" 
                                autocomplete="email" 
                                autofocus
                            />
                            </div>
                        @error('email')
                            <span class="invalid-feedback mx-[15px] text-xs text-red-500 font-[100]" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    {{-- Password --}}
                    <div class="w-full my-[20px]">
                        <div class="flex justify-evenly items-center rounded-md border-[0.5px] border-[#808080a0] py-[5px] p-[15px] mx-[15px]">
                            <input
                                class="w-full bg-transparent border-none outline-none pl-[10px] @error('password') is-invalid @enderror"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value="{{ old('password') }}" 
                                autocomplete="password" 
                                autofocus
                            />
                        </div>
                        @error('password')
                            <span class="invalid-feedback mx-[15px] text-xs text-red-500 font-[100]" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    {{-- submit button --}}
                    <div class="w-full">
                        <div class="flex justify-evenly items-center bg-[orangered] rounded-md border-[0.5px] border-[#808080a0] py-[5px] p-[15px]  my-[20px] mx-[15px]">
                            <button
                                class="w-full bg-transparent border-none outline-none pl-[10px]"
                                type="submit"
                            >LOGIN</button>
                            </div>
                    </div>

                    {{-- register link --}}
                    <a href="{{ url('register-form') }}">
                        <div class="w-full text-right px-5 pb-5 text-[12px] hover:text-blue-500 cursor-pointer">Create an Account</div>
                    </a>
                </div>
            </form>
        </div>
@endsection