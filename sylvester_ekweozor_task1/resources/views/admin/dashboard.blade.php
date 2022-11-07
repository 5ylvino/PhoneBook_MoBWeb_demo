@extends('layouts.app')

@section('content')
<div>
        {{-- section 1 --}}
    <div class="bg-[#333333] p-[10px] pt-6 border-b-[0.5px] border-b-[#fa000052]">
      <div class="grid grid-cols-2 justify-between items-center">
        <div class="table-row justify-evenly items-center py-1">
          <h2 class="text-white font-bold capitalize">user management</h2>
          <div class="text-white font-[400] text-[14px]">
            All aspects related to application users can be managed from here
          </div>
        </div>
        <div class="md:pr-[25px]">
          <a  href="{{ url('logout') }}" 
            onclick="event.preventDefault();
            document.getElementById('logout-form').submit();">
            <div class="my-3 md:m-3 hover:bg-[#ff4400a9] capitalize cursor-pointer border-[orangered] bg-slate-900 py-[5px] px-[10px] rounded-[5px] shadow-[orangered] w-fit float-right flex justify-between items-center font-bold">
              <div class="pl-[10] text-white">
                Logout
              </div>
            </div>
          </a>
          <form id="logout-form" action="{{ url('logout') }}" method="POST" class="hidden">
              @csrf
              <input type="hidden" name="id" value={{ Auth::user()->id }}>
          </form>

          @if (Auth::user())
          <div class="my-3 md:m-3 capitalize cursor-pointer bg-slate-500 text-slate-900 py-[5px] px-[10px] rounded-[5px] shadow-[orangered] w-fit float-right flex justify-between items-center font-bold">
            <div class="pl-[10]">
              {{ Auth::user()->name }}
            </div>
          </div>
          @endif
        </div> 
      </div>
    </div>

    {{-- section 2 --}}
    <div class="grid grid-cols-2 justify-between items-center overflow-x-auto mt-4">
      <div class="flex flex-nowrap justify-start items-center py-2 px-1">
        @foreach (["all users"] as $index => $value)
            <a class="text-white font-bold capitalize cursor-pointer py-[10px] px-[20px] rounded-[5px] shadow-sm navigationItem:hover focus:border-[orangered] active:border-[orangered] focus:bg-[orangered] active:bg-[orangered] focus:p-[10px 20px] active:p-[10px 20px] focus:rounded-[5px] active:rounded-[5px] focus:shadow-[orangered] active:shadow-[orangered]" key={{$index}}>
                {{$value}}
            </a>
            @endforeach
      </div>
    </div>

    {{-- section 3 --}}
    <div class=" overflow-x-auto mx-[1rem] mb-[1rem] pb-[4px] border-[0.5px] border-[#fa000052] rounded-md bg-[#33333397]">
        {{-- search --}}
        <div class="w-full">
          <form action="{{ url('search') }}" method="post">
              @csrf
              <div class="flex justify-evenly items-center rounded-md border-[0.5px] border-[#808080a0] py-[5px] p-[15px] my-[20px] mx-[15px]">
              {{-- Search icon here --}}
                <input
                    class="w-full bg-transparent border-none outline-none pl-[10px]"
                    type="text"
                    id="search"
                    name="search"
                    placeholder="Search by name, email or username..."
                />
                <button type="submit" class="hover:bg-slate-900 bg-blue-800 rounded-md py-1 px-3 mx-1">Search</button>
                <button type="submit" class="hover:bg-slate-900 bg-blue-800 rounded-md py-1 px-3 mx-1" onsubmit="window.document.querySelector('#search').value = '';">Refresh</button>
              </div>
          </form>
      </div>
        {{-- table --}}
        <table class="border-collapse table-auto w-full text-sm">
        <thead>
            <tr>
                @foreach (["Username", "Full name", "Contact Number", "Email"] as $coloum_title)
                    <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"> {{$coloum_title}}</th>
                @endforeach
            </tr>
        </thead>
        <tbody class="text-slate-500 dark:text-slate-400">
                @foreach ($users as $user)
                    <tr class="hover:dark:bg-slate-900">
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 ">{{$user->username}}</td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 ">{{$user->name}}</td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 ">{{$user->phone}}</td>
                        <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 ">{{$user->email}}</td>
                    </tr>
                @endforeach
        </tbody>
        </table>
    </div>
</div>
@endsection