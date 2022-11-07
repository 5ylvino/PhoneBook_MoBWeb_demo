<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    
    /**
     * Reigster business logics
     *
     * @return void
     */
    public function registerIndex()
    {
        return view('auth.register');
    }

    public function registerStore(Request $request)
    {
        
        $this->validate($request, [
                'username' => ["required","unique:users,username"],
                'email' => ["required","email", "unique:users,email"],
                'name' => ["required"],
                'phone' => ["required"],
                'password' => ["required"],
            ],[
                'username.unique' => "This username has been taken",
                'email.unique' => "This email is already in use",
            ]);

        // registering new resource
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        //  on successs
        if($user && isset($request->source)){
            // api
            return Responser::info(true,"Completed successfully", $user);

        } else if ($user && !isset($request->source)){
            // web
            return redirect()->back()->with("success", "Completed Successfully. Click here to proceed with login");
        }
                 
        // on failure
        if(!$user && isset($request->source)){
            // api
            return ValidationException::withMessages(["Error" => "Something went wrong!"]);

        } else if (!$user && !isset($request->source)){
            // web
            return redirect()->back()->with("failed", "Something went wrong!");
        }
    }
    public function update(Request $request)
    {

        $user = User::find($request->id);

        // updating user resource
        $user->username = $request->username;
        $user->email = $request->email;
        $user->name = $request->name;
        $user->phone = $request->phone;
        $user->save();
        
        return Responser::info(true,"Completed successfully", $user);   

    }


    /**
     * Login business logics
     *
     * @return void
     */
    public function loginIndex()
    {
        return view('login');
    }

    public function loginStore(Request $request)
    {
        $this->validate($request, [
            'email' => ["required"],
            'password' => ["required"],
        ]);

        // api
        if(isset($request->source)) {
            $user = User::where("email", $request->email)->first();
            
            if (! $user || ! Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }

            //tokenization
            $user["token"] = $user->createToken($request->email)->plainTextToken;
            return Responser::info(true,"Completed successfully", $user);
            
            // web
        } else if(Auth::attempt($request->only(["email", "password"]))){
            
            return redirect()->intended('dashboard');
            
        }
 
        // if the credentials do not match 
        if(isset($request->source)){
            // api
            return Responser::info(false,"The provided credentials are incorrect.");
        }
        // web
        return redirect()->back()->with("failed", "The provided credentials are incorrect.");

    }
    public function logout(Request $request)
    {
        $userId = $request->id;
        $user = User::find($userId);

        //remove tokenization
        $user->tokens()->delete();

        //reidrect
        if(isset($request->source)){
            // api
            return Responser::info(true,"Logout successfully");
        }

        // web
        auth()->logout();
        return redirect()->route('login');
    }


    /**
     * Dashboard business logics
     *
     * @return void
     */
    public function dashboardIndex()
    {
        // secure
        if (Auth::guard('web')->check()){

            // retrieve all user resources
            $users = User::all();
            return view('admin.dashboard', compact("users"));
        }
        return redirect()->route('login');
    }

    public function dashboardSearch(Request $request)
    {
        $searchTerm = $request["search"];
        $users = DB::select("select username,name,email,phone from users where email like '%{$searchTerm}%' or username like '%{$searchTerm}%' or name like '%{$searchTerm}%'");

        //reidrect
        if(isset($request->source)){
            // api
            return Responser::info(true,"Completed successfully", $users);
        }
        
        // web
        return view('admin.dashboard', compact("users"));
    }

    public function fetchUsers()
    {
        $users = User::all();
        return Responser::info(true,"Completed successfully", $users);
    }
    
}
